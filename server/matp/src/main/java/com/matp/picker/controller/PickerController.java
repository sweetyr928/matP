package com.matp.picker.controller;

import com.matp.picker.dto.PickerRequestDto;
import com.matp.picker.dto.PickerResponseDto;
import com.matp.picker.service.PickerService;
import com.matp.place.dto.PlaceResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/pickers")
@RequiredArgsConstructor
public class PickerController {
    private final PickerService pickerService;

    @PostMapping
    public Mono<ResponseEntity<PickerResponseDto>> pickPlace(@RequestBody PickerRequestDto pickerRequestDto) {
        return pickerService.pickPlace(pickerRequestDto.placeId(), pickerRequestDto.pickerGroupId(), 4L)
                .map(response -> new ResponseEntity<>(response, HttpStatus.CREATED));
    }

    @PatchMapping
    public Mono<ResponseEntity<PickerResponseDto>> updatePickPlace(@RequestBody PickerRequestDto pickerRequestDto) {
        return pickerService.updatePickPlace(pickerRequestDto.placeId(), pickerRequestDto.pickerGroupId(), 4L)
                .map(response -> new ResponseEntity<>(response, HttpStatus.OK));
    }

    @DeleteMapping("/{place-id}")
    public Mono<Void> cancelPickPlace(@PathVariable("place-id") long placeId) {
        return pickerService.cancelPickPlace(placeId, 4L);
    }

    @GetMapping("/{group-id}")
    public Flux<PlaceResponseDto> findPickPlaces(@PathVariable("group-id") long groupId) {
        return pickerService.findPickersByGroup(groupId, 4L);
    }
}
