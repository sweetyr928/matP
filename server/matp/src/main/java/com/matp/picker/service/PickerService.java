package com.matp.picker.service;

import com.matp.exception.CustomErrorCode;
import com.matp.exception.CustomException;
import com.matp.group.repository.GroupRepository;
import com.matp.picker.dto.PickerResponseDto;
import com.matp.picker.entity.Picker;
import com.matp.picker.repository.PickerRepository;
import com.matp.place.dto.PlaceResponseDto;
import com.matp.place.service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PickerService {
    private final PickerRepository pickerRepository;
    private final PlaceService placeService;
    private final GroupRepository groupRepository;

    @Transactional
    public Mono<PickerResponseDto> pickPlace(long placeId, long pickerGroupId, long memberId) {
        return pickerRepository.findByIds(placeId, memberId).map(PickerResponseDto::of)
                .switchIfEmpty(pickerRepository.save(Picker.of(placeId, pickerGroupId, memberId)).map(PickerResponseDto::of));
    }


    @Transactional
    public Mono<Void> cancelPickPlace(long placeId, long memberId) {
        return pickerRepository.deleteByIds(placeId, memberId);
    }


    @Transactional
    public Mono<PickerResponseDto> updatePickPlace(long placeId, long pickerGroupId, long memberId) {
        return pickerRepository.findByIds(placeId, memberId).
                flatMap(picker -> pickerRepository
                                .save(Picker.builder()
                                        .id(picker.getId())
                                        .placeId(placeId)
                                        .pickerGroupId(pickerGroupId)
                                        .memberId(memberId)
                                        .createdAt(picker.getCreatedAt())
                                        .modifiedAt(LocalDateTime.now())
                                        .build()))
                                .map(PickerResponseDto::of);
    }

    @Transactional(readOnly = true)
    public Flux<PlaceResponseDto> findPickersByGroup(long pickerGroupId) {
        return pickerRepository.findByPickerGroupId(pickerGroupId)
                .concatMap(picker -> placeService.findByPlaceId(picker.getPlaceId()))
                .switchIfEmpty(Mono.error(new CustomException(CustomErrorCode.GROUP_NOT_FOUND)));
    }

    @Transactional(readOnly = true)
    public Flux<PlaceResponseDto> findAllPickers(long memberId) {
        return groupRepository.findAllByMemberId(memberId)
                .concatMap(group -> pickerRepository.findByPickerGroupId(group.getId())
                                .concatMap(picker -> placeService.findByPlaceId(picker.getPlaceId(), group.getGroupImgIndex()))
                );
    }
}
