package com.matp.group.repository;

import com.matp.group.entity.Group;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface GroupRepository extends ReactiveCrudRepository<Group, Long> {

    @Query("""
        SELECT id, name, group_img_index
        FROM picker_group
        WHERE member_id = :memberId
    """)
    Flux<Group> findAllByMemberId(long memberId);

    @Query("""
        SELECT id, name, group_img_index, member_id, created_at
        FROM picker_group
        WHERE member_id = :memberId and id = :groupId
    """)
    Mono<Group> findByIds(Long groupId, Long memberId);
}
