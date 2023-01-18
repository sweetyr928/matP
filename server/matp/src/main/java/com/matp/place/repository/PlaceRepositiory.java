package com.matp.place.repository;

import com.matp.place.entity.Place;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

public interface PlaceRepositiory extends ReactiveCrudRepository<Place, Integer> {
    // SELECT에 추가되야할 내용 - img, stars
    // 쿼리에 추가되야할 내용 - 탑 15개

    @Query("""
        SELECT p1.id, p1.tel, p1.address, p1.name, st_astext(p1.point) as point
        FROM place p1
        where st_distance_sphere(point, POINT(:longitude, :latitude)) < :round;
        """)
    Flux<Place> getPlaces(double longitude, double latitude, int round);

}
