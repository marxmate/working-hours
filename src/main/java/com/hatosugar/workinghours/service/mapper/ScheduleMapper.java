package com.hatosugar.workinghours.service.mapper;

import com.hatosugar.workinghours.domain.Schedule;
import com.hatosugar.workinghours.service.dto.ScheduleDTO;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Service;

/**
 * Mapper for the entity Schedule and its DTO ScheduleDTO.
 */
@Mapper(componentModel = "spring", uses = AuthorityMapper.class)
@Service
public interface ScheduleMapper extends EntityMapper<ScheduleDTO, Schedule> {

    Schedule toEntity(ScheduleDTO scheduleDTO);

    default Schedule fromId(Long id) {
        if (id == null) {
            return null;
        }
        Schedule schedule = new Schedule();
        schedule.setId(id);
        return schedule;
    }
}
