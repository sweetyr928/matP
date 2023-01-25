package com.matp.group.controller;

import com.matp.group.dto.GroupRequestDto;
import com.matp.group.dto.GroupResponseDto;
import com.matp.group.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping("/groups")
public class GroupController {
    private final GroupService groupService;

    // 모든 기능 멤버 아이디값 가져와야됨
    @PostMapping
    public Mono<ResponseEntity<GroupResponseDto>> postGroup(@RequestBody Mono<GroupRequestDto> groupPostDto) {
        return groupPostDto.flatMap(dto -> groupService.createGroup(dto, 1L))
                .map(response -> new ResponseEntity<>(response, HttpStatus.CREATED));
    }


    @PatchMapping("/{group-id}")
    public Mono<ResponseEntity<GroupResponseDto>> patchGroup(@PathVariable("group-id") Long groupId, @RequestBody Mono<GroupRequestDto> groupPatchDto) {
        return groupPatchDto.flatMap((GroupRequestDto dto) -> groupService.updateGroup(dto, groupId, 1L))
                .map(response -> new ResponseEntity<>(response, HttpStatus.OK));
    }


    @GetMapping
    public Flux<GroupResponseDto> getGroups() {
        return groupService.findGroups(1L);
    }


    @DeleteMapping("/{group-id}")
    public Mono<ResponseEntity<Void>> deleteGroup(@PathVariable("group-id") Long groupId) {
        return groupService.deleteGroup(groupId, 1L)
                .map(response -> ResponseEntity.noContent().build());
    }
}
