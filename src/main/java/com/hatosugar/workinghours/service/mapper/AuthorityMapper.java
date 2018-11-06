package com.hatosugar.workinghours.service.mapper;

import com.hatosugar.workinghours.domain.Authority;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Service;

import java.util.Set;

@Mapper(componentModel = "spring")
@Service
public interface AuthorityMapper extends EntityMapper<String, Authority>{
    Authority toEntity(String string);

    String toDto(Authority authority);

    Set<Authority> toEntity(Set<String> stringSet);

    Set<String> toDto(Set<Authority> authoritySet);
}
