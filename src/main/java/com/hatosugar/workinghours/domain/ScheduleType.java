package com.hatosugar.workinghours.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.io.Serializable;

import static com.hatosugar.workinghours.config.Constants.TIME_FORMAT_REGEX;

/**
 * A ScheduleType.
 */
@Entity
@Table(name = "schedule_type")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Pattern(regexp = TIME_FORMAT_REGEX)
    @Column(name = "from_time", nullable = false)
    private String fromTime;

    @NotNull
    @Pattern(regexp = TIME_FORMAT_REGEX)
    @Column(name = "to_time", nullable = false)
    private String toTime;
}
