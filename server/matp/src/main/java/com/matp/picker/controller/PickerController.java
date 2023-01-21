package com.matp.picker.controller;

import com.matp.picker.dto.PickerResponseDto;
import com.matp.picker.service.PickerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/places/{place-id}/pickers")
@RequiredArgsConstructor
public class PickerController {
    private final PickerService pickerService;

    @PostMapping("/{group-id}")
    public Mono<ResponseEntity<PickerResponseDto>> pickPlace(@PathVariable("place-id") long placeId, @PathVariable("group-id") long groupId) {
        return pickerService.pickPlace(placeId, groupId, 1L)
                .map(response -> new ResponseEntity<>(response, HttpStatus.CREATED));
    }

    @DeleteMapping
    public Mono<Void> cancelPickPlace(@PathVariable("place-id") long placeId) {
        return pickerService.cancelPickPlace(placeId, 1L);
    }
}
