package com.matp.group.controller;

import com.matp.auth.jwt.JwtTokenProvider;
import com.matp.group.dto.GroupRequestDto;
import com.matp.group.dto.GroupResponseDto;
import com.matp.group.service.GroupService;
import com.matp.utils.Function;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping("/groups")
public class GroupController {
    private final GroupService groupService;
    private final Function function;

    // 모든 기능 멤버 아이디값 가져와야됨
    @PostMapping
    public Mono<ResponseEntity<GroupResponseDto>> postGroup(@RequestBody Mono<GroupRequestDto> groupPostDto,
                                                            ServerHttpRequest jwt) {
        Long memberId = function.extractId(jwt);
        return groupPostDto.flatMap(dto -> groupService.createGroup(dto, memberId))
                .map(response -> new ResponseEntity<>(response, HttpStatus.CREATED));
    }


    @PatchMapping("/{group-id}")
    public Mono<ResponseEntity<GroupResponseDto>> patchGroup(@PathVariable("group-id") Long groupId, @RequestBody Mono<GroupRequestDto> groupPatchDto,
                                                             ServerHttpRequest jwt) {
        Long memberId = function.extractId(jwt);
        return groupPatchDto.flatMap((GroupRequestDto dto) -> groupService.updateGroup(dto, groupId, memberId))
                .map(ResponseEntity::ok);
    }


    @GetMapping
    public Flux<GroupResponseDto> getGroups(ServerHttpRequest jwt) {
        Long memberId = function.extractId(jwt);
        return groupService.findGroups(memberId);
    }


    @DeleteMapping("/{group-id}")
    public Mono<ResponseEntity<Void>> deleteGroup(@PathVariable("group-id") Long groupId,
                                                  ServerHttpRequest jwt) {
        Long memberId = function.extractId(jwt);
        return groupService.deleteGroup(groupId, memberId)
                .map(response -> ResponseEntity.noContent().build());
    }

}
