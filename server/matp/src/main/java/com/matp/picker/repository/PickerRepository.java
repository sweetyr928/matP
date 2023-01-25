package com.matp.picker.repository;

import com.matp.picker.entity.Picker;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

public interface PickerRepository extends ReactiveCrudRepository<Picker, Long> {

    @Query("""
    SELECT id, place_id, group_id, member_id
    FROM picker 
    WHERE place_id = :placeId and member_id = :memberId;
    """)
    Mono<Picker> findByIds(long placeId, long memberId);


    @Query("""
    DELETE FROM picker 
    WHERE place_id = :placeId and member_id = :memberId;
    """)
    Mono<Void> deleteByIds(long placeId, long memberId);
}
