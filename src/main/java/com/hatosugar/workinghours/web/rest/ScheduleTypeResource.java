package com.hatosugar.workinghours.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hatosugar.workinghours.domain.ScheduleType;
import com.hatosugar.workinghours.repository.ScheduleTypeRepository;
import com.hatosugar.workinghours.web.rest.errors.BadRequestAlertException;
import com.hatosugar.workinghours.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ScheduleType.
 */
@RestController
@RequestMapping("/api")
public class ScheduleTypeResource {

    private final Logger log = LoggerFactory.getLogger(ScheduleTypeResource.class);

    private static final String ENTITY_NAME = "scheduleType";

    private final ScheduleTypeRepository scheduleTypeRepository;

    public ScheduleTypeResource(ScheduleTypeRepository scheduleTypeRepository) {
        this.scheduleTypeRepository = scheduleTypeRepository;
    }

    @PostMapping("/schedule-types")
    @Timed
    public ResponseEntity<ScheduleType> createScheduleType(@Valid @RequestBody ScheduleType scheduleType) throws URISyntaxException {
        log.debug("REST request to save ScheduleType : {}", scheduleType);
        if (scheduleType.getId() != null) {
            throw new BadRequestAlertException("A new scheduleType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ScheduleType result = scheduleTypeRepository.save(scheduleType);
        return ResponseEntity.created(new URI("/api/schedule-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PutMapping("/schedule-types")
    @Timed
    public ResponseEntity<ScheduleType> updateScheduleType(@Valid @RequestBody ScheduleType scheduleType) throws URISyntaxException {
        log.debug("REST request to update ScheduleType : {}", scheduleType);
        if (scheduleType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ScheduleType result = scheduleTypeRepository.save(scheduleType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, scheduleType.getId().toString()))
            .body(result);
    }

    @GetMapping("/schedule-types")
    @Timed
    public List<ScheduleType> getAllScheduleTypes() {
        log.debug("REST request to get all ScheduleTypes");
        return scheduleTypeRepository.findAll();
    }

    @GetMapping("/schedule-types/{id}")
    @Timed
    public ResponseEntity<ScheduleType> getScheduleType(@PathVariable Long id) {
        log.debug("REST request to get ScheduleType : {}", id);
        Optional<ScheduleType> scheduleType = scheduleTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(scheduleType);
    }

    /**
     * DELETE  /schedule-types/:id : delete the "id" scheduleType.
     *
     * @param id the id of the scheduleType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/schedule-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteScheduleType(@PathVariable Long id) {
        log.debug("REST request to delete ScheduleType : {}", id);

        scheduleTypeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
