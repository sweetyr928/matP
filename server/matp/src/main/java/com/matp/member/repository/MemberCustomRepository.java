package com.matp.member.repository;

import com.matp.group.dto.GroupResponseDto;
import com.matp.member.dto.MemberResponse;
import com.matp.member.entity.Member;
import com.matp.post.dto.SimplePostResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * DatabaseClient 사용하여 레포지토리 구현
 * 직접 SQL 쿼리문을 작성하여 유저 정보를 조회할 때 다른 테이블도 조회하여 정보를 가져온다
 */
@Slf4j
@Repository
@RequiredArgsConstructor
public class MemberCustomRepository {
    private static final String MEMBER_ID_FIELD_NAME = "memberId";
    private final DatabaseClient databaseClient;
    private final MemberRepository memberRepository;
    /**
     * 회원 정보를 조회하여 MemberResponse로 매핑 후 가져올 때
     * 팔로우 카운팅과 팔로워 카운팅, 포스트 정보, 피커 그룹 정보들도 함꼐 조회하여 가져온다
     */
    public Flux<MemberResponse> findWithInfo(Long myId, Long id) {
        var sqlWithFollow = """
                    SELECT
                        m.member_id as memberId, m.email as email, m.nickname as nickname,
                        m.birthday as birthday, m.profile_url as profileUrl,
                        m.gender as gender, m.memo as memo, m.registration_id as registrationId,
                        m.created_at as createdAt, m.modified_at as modifiedAt,
                        p.id as postId, p.title as title, p.thumbnail_url as thumbnailUrl, p.likes as likes,
                        g.id as groupId, g.name as name, g.group_img_index as groupImgIndex,
                        (SELECT COUNT(f.follower_id) as followers FROM follow f WHERE m.member_id = f.following_id),
                        (SELECT COUNT(f.following_id) as followings FROM follow f WHERE m.member_id = f.follower_id)
                    FROM member m
                    LEFT JOIN post p
                    ON m.member_id = p.member_id
                    LEFT JOIN picker_group g
                    ON m.member_id = g.member_id
                    """;

        return databaseClient.sql(sqlWithFollow)
                .fetch().all()
                .sort(Comparator.comparing(result -> (Long) result.get(MEMBER_ID_FIELD_NAME)))
                .bufferUntilChanged(result -> result.get(MEMBER_ID_FIELD_NAME))
                .publishOn(Schedulers.boundedElastic())
                .map(result -> {
                    Object followerObj = result.get(0).get("(SELECT COUNT(f.follower_id) as followers FROM follow f WHERE m.member_id = f.following_id)");
                    Object followingObj = result.get(0).get("(SELECT COUNT(f.following_id) as followings FROM follow f WHERE m.member_id = f.follower_id)");

                    var followers = followerObj != null ? Long.parseLong(followerObj.toString()) : 0L;
                    var followings = followingObj != null ? Long.parseLong(followingObj.toString()) : 0L;

                    var postInfos = result.stream()
                            .map(row -> SimplePostResponse.builder()
                                    .id((Long) row.get("postId"))
                                    .title((String) row.get("title"))
                                    .thumbnailUrl((String) row.get("thumbnailUrl"))
                                    .likes((Integer) row.get("likes"))
                                    .build())
                            .collect(Collectors.toSet());

                    var pickerGroupInfos = result.stream()
                            .map(row -> GroupResponseDto.builder()
                                    .id((Long) row.get("groupId"))
                                    .name((String) row.get("name"))
                                    .groupImgIndex((int) row.get("groupImgIndex"))
                                    .build())
                            .collect(Collectors.toSet());
                    var row = result.get(0);
                    var check = memberRepository.getFollowCheck(myId,id).block();

                    boolean equals = check != null;

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
                            .isFollowing(equals)
                            .postInfos(postInfos)
                            .pickerGroupInfos(pickerGroupInfos)
                            .build());
                });
    }
    public Flux<MemberResponse> findWithInfo2() {
        var sqlWithFollow = """
                    SELECT
                        m.member_id as memberId, m.email as email, m.nickname as nickname,
                        m.birthday as birthday, m.profile_url as profileUrl,
                        m.gender as gender, m.memo as memo, m.registration_id as registrationId,
                        m.created_at as createdAt, m.modified_at as modifiedAt,
                        p.id as postId, p.title as title, p.thumbnail_url as thumbnailUrl, p.likes as likes,
                        g.id as groupId, g.name as name, g.group_img_index as groupImgIndex,
                        (SELECT COUNT(f.follower_id) as followers FROM follow f WHERE m.member_id = f.following_id),
                        (SELECT COUNT(f.following_id) as followings FROM follow f WHERE m.member_id = f.follower_id)
                    FROM member m
                    LEFT JOIN post p
                    ON m.member_id = p.member_id
                    LEFT JOIN picker_group g
                    ON m.member_id = g.member_id
                    """;

        return databaseClient.sql(sqlWithFollow)
                .fetch().all()
                .sort(Comparator.comparing(result -> (Long) result.get(MEMBER_ID_FIELD_NAME)))
                .bufferUntilChanged(result -> result.get(MEMBER_ID_FIELD_NAME))
                .publishOn(Schedulers.boundedElastic())
                .map(result -> {
                    Object followerObj = result.get(0).get("(SELECT COUNT(f.follower_id) as followers FROM follow f WHERE m.member_id = f.following_id)");
                    Object followingObj = result.get(0).get("(SELECT COUNT(f.following_id) as followings FROM follow f WHERE m.member_id = f.follower_id)");

                    var followers = followerObj != null ? Long.parseLong(followerObj.toString()) : 0L;
                    var followings = followingObj != null ? Long.parseLong(followingObj.toString()) : 0L;

                    var postInfos = result.stream()
                            .map(row -> {
                                if (row.get("postId") == null){
                                    return null;
                                }
                                return SimplePostResponse.builder()
                                    .id((Long) row.get("postId"))
                                    .title((String) row.get("title"))
                                    .thumbnailUrl((String) row.get("thumbnailUrl"))
                                    .likes((Integer) row.get("likes"))
                                    .build();})
                            .collect(Collectors.toSet());

                    var pickerGroupInfos = result.stream()
                            .map(row -> GroupResponseDto.builder()
                                    .id((Long) row.get("groupId"))
                                    .name((String) row.get("name"))
                                    .groupImgIndex((int) row.get("groupImgIndex"))
                                    .build())
                            .collect(Collectors.toSet());
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
                            .pickerGroupInfos(pickerGroupInfos)
                            .build());
                });
    }

}
