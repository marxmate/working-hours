package com.hatosugar.workinghours.service.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import static com.hatosugar.workinghours.config.Constants.TIME_FORMAT_REGEX;

@Data
public class ScheduleTypeDTO {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    @Pattern(regexp = TIME_FORMAT_REGEX)
    private String fromTime;

    @NotNull
    @Pattern(regexp = TIME_FORMAT_REGEX)
    private String toTime;
}
