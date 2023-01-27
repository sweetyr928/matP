package com.matp.picker.service;

import com.matp.picker.dto.PickerResponseDto;
import com.matp.picker.entity.Picker;
import com.matp.picker.repository.PickerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PickerService {
    private final PickerRepository pickerRepository;

    @Transactional
    public Mono<PickerResponseDto> pickPlace(long placeId, long groupId, long memberId) {
        return pickerRepository.findByIds(placeId, memberId).map(PickerResponseDto::of)
                .switchIfEmpty(pickerRepository.save(Picker.of(placeId, groupId, memberId)).map(PickerResponseDto::of));
    }


    @Transactional
    public Mono<Void> cancelPickPlace(long placeId, long memberId) {
        return pickerRepository.deleteByIds(placeId, memberId);
    }

    @Transactional(readOnly = true)
    public Mono<List<Picker>> findPickers(long placeId) {
        return pickerRepository.findByPlaceId(placeId).collectList();
    }
}
