package com.hatosugar.workinghours.service.impl;

import com.hatosugar.workinghours.domain.Schedule;
import com.hatosugar.workinghours.repository.ScheduleRepository;
import com.hatosugar.workinghours.service.ScheduleService;
import com.hatosugar.workinghours.service.dto.ScheduleDTO;
import com.hatosugar.workinghours.service.mapper.ScheduleMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing Schedule.
 */
@Service
@Transactional
@Slf4j
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;

    private final ScheduleMapper scheduleMapper;

    @Autowired
    public ScheduleServiceImpl(ScheduleRepository scheduleRepository, ScheduleMapper scheduleMapper) {
        this.scheduleRepository = scheduleRepository;
        this.scheduleMapper = scheduleMapper;
    }

    @Override
    public ScheduleDTO save(ScheduleDTO scheduleDTO) {
        log.debug("Request to save Schedule : {}", scheduleDTO);
        Schedule schedule = scheduleMapper.toEntity(scheduleDTO);
        schedule = scheduleRepository.save(schedule);
        return scheduleMapper.toDto(schedule);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ScheduleDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Schedules");
        return scheduleRepository.findAll(pageable)
            .map(scheduleMapper::toDto);
    }


    @Transactional(readOnly = true)
    public List<ScheduleDTO> findAllWhereScheduleTypeIsNull() {
        log.debug("Request to get all schedules where ScheduleType is null");
        return StreamSupport
            .stream(scheduleRepository.findAll().spliterator(), false)
            .filter(schedule -> schedule.getScheduleType() == null)
            .map(scheduleMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ScheduleDTO> findOne(Long id) {
        log.debug("Request to get Schedule : {}", id);
        return scheduleRepository.findById(id)
            .map(scheduleMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Schedule : {}", id);
        scheduleRepository.deleteById(id);
    }
}
