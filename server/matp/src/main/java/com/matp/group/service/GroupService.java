package com.matp.group.service;

import com.matp.group.dto.GroupRequestDto;
import com.matp.group.dto.GroupResponseDto;
import com.matp.group.entity.Group;
import com.matp.group.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class GroupService {
    private final GroupRepository groupRepository;

    @Transactional
    public Mono<GroupResponseDto> createGroup(GroupRequestDto groupRequestDto, Long memberId) {
        Mono<Group> group = groupRepository.save(groupRequestDto.of(memberId));
        return group.map(GroupResponseDto::of);
    }
    // 멤버 아이디 받아와서 같은지 확인하는 로직 필요함
    @Transactional
    public Mono<GroupResponseDto> updateGroup(GroupRequestDto groupRequestDto, Long groupId, Long memberId) {
        Mono<Group> findGroup = groupRepository.findByIds(groupId, memberId)
                .map(group ->
                        Group.builder()
                                .id(groupId)
                                .name(groupRequestDto.name() == null ? group.getName() : groupRequestDto.name())
                                .groupImgIndex(groupRequestDto.groupImgIndex() == 0 ? group.getGroupImgIndex() : groupRequestDto.groupImgIndex())
                                .createdAt(group.getCreatedAt())
                                .modifiedAt(LocalDateTime.now())
                                .memberId(group.getMemberId())
                                .build());
        return findGroup.flatMap(group -> groupRepository.save(group).map(GroupResponseDto::of));
    }

    @Transactional(readOnly = true)
    public Flux<GroupResponseDto> findGroups(Long memberId) {
        return groupRepository.findAllByMemberId(memberId).map(GroupResponseDto::of);
    }


    // 전체 갯수가 하나면 삭제 못하게 막아야됨
    // 삭제할 groupId를 가진 group이 존재해야함 -> 존재하지않아도 에러발생안함
    // 삭제하려는사람과 삭제될 그룹의 memberId 같은지 확인해야됨
    @Transactional
    public Mono<Void> deleteGroup(Long groupId, Long memberId) {
        return  groupRepository.findByIds(groupId, memberId).flatMap(groupRepository::delete);
    }
}

