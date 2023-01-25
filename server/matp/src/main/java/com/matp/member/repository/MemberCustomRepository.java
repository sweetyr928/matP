package com.matp.member.repository;

import com.matp.member.dto.MemberResponse;
import com.matp.member.entity.Member;
import com.matp.post.dto.SimplePostResponse;
import com.matp.post.entity.Post;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

import java.time.LocalDateTime;
import java.util.Comparator;

/**
 * DatabaseClient 사용하여 레포지토리 구현
 * 직접 SQL 쿼리문을 작성하여 유저 정보를 조회할 때 팔로우 테이블도 조회하여 팔로잉과 팔로워 수를 카운트하여 가져온다
 */
@Slf4j
@Repository
@RequiredArgsConstructor
public class MemberCustomRepository {
    private static final String MEMBER_ID_FIELD_NAME = "memberId";
    private final DatabaseClient databaseClient;

    /**
     * 회원 정보를 조회하여 MemberResponse로 매핑 후 가져올 때
     * 팔로우 카운팅과 팔로워 카운팅, 포스트 정보들도 함꼐 조회하여 가져온다
     */
    public Flux<MemberResponse> findWithFollow() {
        var sqlWithFollow = """
                SELECT 
                    m.member_id as memberId, m.email as email, m.nickname as nickname,
                    m.birthday as birthday, m.profile_url as profileUrl, 
                    m.gender as gender, m.memo as memo, m.registration_id as registrationId,
                    m.created_at as createdAt, m.modified_at as modifiedAt,
                    p.id as postId, p.title as title, p.thumbnail_url as thumbnailUrl,
                    (SELECT COUNT(f.follower_email) as followers FROM follow f WHERE m.email = f.following_email),
                    (SELECT COUNT(f.following_email) as followings FROM follow f WHERE m.email = f.follower_email)   
                FROM member m
                INNER JOIN post p
                ON m.member_id = p.member_id
                """;

        return databaseClient.sql(sqlWithFollow)
                .fetch().all()
                .sort(Comparator.comparing(result -> (Long) result.get(MEMBER_ID_FIELD_NAME)))
                .bufferUntilChanged(result -> result.get(MEMBER_ID_FIELD_NAME))
                .map(result -> {
                    var followers = Long.parseLong(result.get(0).get("(SELECT COUNT(f.follower_email) as followers FROM follow f WHERE m.email = f.following_email)").toString());
                    var followings = Long.parseLong(result.get(0).get("(SELECT COUNT(f.following_email) as followings FROM follow f WHERE m.email = f.follower_email)").toString());

                    var postInfos = result.stream()
                            .map(row -> SimplePostResponse.builder()
                                    .postId((Long) row.get("postId"))
                                    .title((String) row.get("title"))
                                    .thumbnailUrl((String) row.get("thumbnailUrl"))
                                    .build())
                            .toList();

                    var row = result.get(0);
                    return MemberResponse.from(Member.builder()
                            .memberId((Long) row.get(MEMBER_ID_FIELD_NAME))
                            .email((String) row.get("email"))
                            .nickname((String) row.get("nickname"))
                            .birthday((String) row.get("birthday"))
                            .profileUrl((String) row.get("profileUrl"))
                            .gender((Integer) row.get("gender"))
                            .memo((String) row.get("memo"))
                            .registrationId((String) row.get("registrationId"))
                            .createdAt((LocalDateTime) row.get("createdAt"))
                            .modifiedAt((LocalDateTime) row.get("modifiedAt"))
                            .followings(followings)
                            .followers(followers)
                            .postInfos(postInfos)
                            .build());
                });
    }

}
