package com.matp.place.repository;

import com.matp.place.dto.PlaceEnrollmentResponse;
import com.matp.place.entity.Place;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface PlaceRepository extends ReactiveCrudRepository<Place, Long> {


    @Query("""
        SELECT id, tel, address, name, st_astext(point) as point
        FROM place
        WHERE st_distance_sphere(point, POINT(:longitude, :latitude)) < :round;
    """)
    Flux<Place> findPlaces(double longitude, double latitude, int round);

    @Query("""
        SELECT id, tel, address, name, st_astext(point) as point, zonecode, category
        FROM place
        WHERE id = :placeId
    """)
    Mono<Place> findPlaceDetail(Long placeId);

    @Query("""
        SELECT id, tel, address, name, st_astext(point) as point
        FROM place
        WHERE address LIKE CONCAT('%', :search, '%')
        OR category LIKE CONCAT('%', :search, '%')
        OR name LIKE CONCAT('%', :search, '%')
    """)
    Flux<Place> searchPlaces(String search);

    @Query("""
        SELECT id, tel, address, name, st_astext(point) as point
        FROM place
        WHERE (address LIKE CONCAT('%', :query1, '%'))
        AND (category LIKE CONCAT('%', :query2, '%') OR name LIKE CONCAT('%', :query2, '%'))
    """)
    Flux<Place> searchPlaces(String query1, String query2);
    @Query("""
            insert into place_add_request(tel, address, zonecode, name, category)
            values(:tel, :address, :roadNameAddress, :name, :category)
            """)
    Mono<PlaceEnrollmentResponse> registerPlaceInfo(String tel, String address, String roadNameAddress, String name, String category);

    @Query("""
        SELECT id, tel, address, name, st_astext(point) as point
        FROM place
        WHERE id = :placeId
    """)
    Flux<Place> findByPlaceId(long placeId);
}
