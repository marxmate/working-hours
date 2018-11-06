package com.hatosugar.workinghours.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hatosugar.workinghours.service.ScheduleService;
import com.hatosugar.workinghours.service.dto.ScheduleDTO;
import com.hatosugar.workinghours.web.rest.errors.BadRequestAlertException;
import com.hatosugar.workinghours.web.rest.util.HeaderUtil;
import com.hatosugar.workinghours.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Schedule.
 */
@RestController
@RequestMapping("/api")
public class ScheduleResource {

    private final Logger log = LoggerFactory.getLogger(ScheduleResource.class);

    private static final String ENTITY_NAME = "schedule";

    private final ScheduleService scheduleService;

    public ScheduleResource(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    /**
     * POST  /schedules : Create a new schedule.
     *
     * @param scheduleDTO the scheduleDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new scheduleDTO, or with status 400 (Bad Request) if the schedule has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/schedules")
    @Timed
    public ResponseEntity<ScheduleDTO> createSchedule(@Valid @RequestBody ScheduleDTO scheduleDTO) throws URISyntaxException {
        log.debug("REST request to save Schedule : {}", scheduleDTO);
        if (scheduleDTO.getId() != null) {
            throw new BadRequestAlertException("A new schedule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ScheduleDTO result = scheduleService.save(scheduleDTO);
        return ResponseEntity.created(new URI("/api/schedules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /schedules : Updates an existing schedule.
     *
     * @param scheduleDTO the scheduleDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated scheduleDTO,
     * or with status 400 (Bad Request) if the scheduleDTO is not valid,
     * or with status 500 (Internal Server Error) if the scheduleDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/schedules")
    @Timed
    public ResponseEntity<ScheduleDTO> updateSchedule(@Valid @RequestBody ScheduleDTO scheduleDTO) throws URISyntaxException {
        log.debug("REST request to update Schedule : {}", scheduleDTO);
        if (scheduleDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ScheduleDTO result = scheduleService.save(scheduleDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, scheduleDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /schedules : get all the schedules.
     *
     * @param pageable the pagination information
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of schedules in body
     */
    @GetMapping("/schedules")
    @Timed
    public ResponseEntity<List<ScheduleDTO>> getAllSchedules(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("scheduletype-is-null".equals(filter)) {
            log.debug("REST request to get all Schedules where scheduleType is null");
            return new ResponseEntity<>(scheduleService.findAllWhereScheduleTypeIsNull(),
                    HttpStatus.OK);
        }
        log.debug("REST request to get a page of Schedules");
        Page<ScheduleDTO> page = scheduleService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/schedules");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /schedules/:id : get the "id" schedule.
     *
     * @param id the id of the scheduleDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the scheduleDTO, or with status 404 (Not Found)
     */
    @GetMapping("/schedules/{id}")
    @Timed
    public ResponseEntity<ScheduleDTO> getSchedule(@PathVariable Long id) {
        log.debug("REST request to get Schedule : {}", id);
        Optional<ScheduleDTO> scheduleDTO = scheduleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(scheduleDTO);
    }

    /**
     * DELETE  /schedules/:id : delete the "id" schedule.
     *
     * @param id the id of the scheduleDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/schedules/{id}")
    @Timed
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        log.debug("REST request to delete Schedule : {}", id);
        scheduleService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
