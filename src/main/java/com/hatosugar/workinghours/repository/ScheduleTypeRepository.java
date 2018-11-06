package com.hatosugar.workinghours.repository;

import com.hatosugar.workinghours.domain.ScheduleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ScheduleType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ScheduleTypeRepository extends JpaRepository<ScheduleType, Long> {

}
