package com.matp.place.repository;

import com.matp.place.dto.PlaceEnrollmentResponse;
import com.matp.place.entity.Place;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface PlaceRepositiory extends ReactiveCrudRepository<Place, Long> {
    // SELECT에 추가되야할 내용 - img
    // 쿼리에 추가되야할 내용 - 탑 15개

    @Query("""
                SELECT id, tel, address, name, st_astext(point) as point
                FROM place
                WHERE st_distance_sphere(point, POINT(:longitude, :latitude)) < :round;
            """)
    Flux<Place> findPlaces(double longitude, double latitude, int round);

    @Query("""
                SELECT id, tel, address, name, st_astext(point) as point, road_name_address, category
                FROM place
                WHERE id = :placeId
            """)
    Mono<Place> findPlaceDetail(Long placeId);

    @Query("""
            insert into place_add_request(tel, address, zonecode, name, category)
            values(:tel, :address, :roadNameAddress, :name, :category)
            """)
    Mono<PlaceEnrollmentResponse> registerPlaceInfo(String tel, String address, String roadNameAddress, String name, String category);
}
