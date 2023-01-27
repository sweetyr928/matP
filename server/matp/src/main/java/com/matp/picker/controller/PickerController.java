package com.matp.picker.controller;

import com.matp.auth.jwt.JwtTokenProvider;
import com.matp.picker.dto.PickerRequestDto;
import com.matp.picker.dto.PickerResponseDto;
import com.matp.picker.service.PickerService;
import com.matp.place.dto.PlaceResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/pickers")
@RequiredArgsConstructor
public class PickerController {
    private final PickerService pickerService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping
    public Mono<ResponseEntity<PickerResponseDto>> pickPlace(@RequestBody PickerRequestDto pickerRequestDto, ServerHttpRequest jwt) {
        return pickerService.pickPlace(pickerRequestDto.placeId(), pickerRequestDto.pickerGroupId(), extractId(jwt))
                .map(response -> new ResponseEntity<>(response, HttpStatus.CREATED));
    }

    @PatchMapping
    public Mono<ResponseEntity<PickerResponseDto>> updatePickPlace(@RequestBody PickerRequestDto pickerRequestDto, ServerHttpRequest jwt) {
        return pickerService.updatePickPlace(pickerRequestDto.placeId(), pickerRequestDto.pickerGroupId(), extractId(jwt))
                .map(response -> new ResponseEntity<>(response, HttpStatus.OK));
    }

    @DeleteMapping("/{place-id}")
    public Mono<Void> cancelPickPlace(@PathVariable("place-id") long placeId, ServerHttpRequest jwt) {
        return pickerService.cancelPickPlace(placeId, extractId(jwt));
    }

    @GetMapping("/{group-id}")
    public Mono<List<PlaceResponseDto>> findPickPlaces(@PathVariable("group-id") long groupId, ServerHttpRequest jwt) {
        return pickerService.findPickersByGroup(groupId, extractId(jwt));
    }

    private Long extractId(ServerHttpRequest request) {
        String bearerToken = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        assert bearerToken != null;
        bearerToken = bearerToken.substring(7);
        return jwtTokenProvider.getUserId(bearerToken);
    }
}
