package com.hatosugar.workinghours.service.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;

/**
 * A DTO for the Schedule entity.
 */
@Data
public class ScheduleDTO implements Serializable {

    private Long id;

    @NotNull
    private UserDTO user;

    @NotNull
    private ScheduleTypeDTO scheduleType;

    @NotNull
    private LocalDate date;
}
