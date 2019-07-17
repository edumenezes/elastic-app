package com.elasticapp.web.rest;

import com.elasticapp.domain.SearchEntity;
import com.elasticapp.repository.SearchEntityRepository;
import com.elasticapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.elasticapp.domain.SearchEntity}.
 */
@RestController
@RequestMapping("/api")
public class SearchEntityResource {

    private final Logger log = LoggerFactory.getLogger(SearchEntityResource.class);

    private static final String ENTITY_NAME = "searchEntity";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SearchEntityRepository searchEntityRepository;

    public SearchEntityResource(SearchEntityRepository searchEntityRepository) {
        this.searchEntityRepository = searchEntityRepository;
    }

    /**
     * {@code POST  /search-entities} : Create a new searchEntity.
     *
     * @param searchEntity the searchEntity to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new searchEntity, or with status {@code 400 (Bad Request)} if the searchEntity has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/search-entities")
    public ResponseEntity<SearchEntity> createSearchEntity(@RequestBody SearchEntity searchEntity) throws URISyntaxException {
        log.debug("REST request to save SearchEntity : {}", searchEntity);
        if (searchEntity.getId() != null) {
            throw new BadRequestAlertException("A new searchEntity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SearchEntity result = searchEntityRepository.save(searchEntity);
        return ResponseEntity.created(new URI("/api/search-entities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /search-entities} : Updates an existing searchEntity.
     *
     * @param searchEntity the searchEntity to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated searchEntity,
     * or with status {@code 400 (Bad Request)} if the searchEntity is not valid,
     * or with status {@code 500 (Internal Server Error)} if the searchEntity couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/search-entities")
    public ResponseEntity<SearchEntity> updateSearchEntity(@RequestBody SearchEntity searchEntity) throws URISyntaxException {
        log.debug("REST request to update SearchEntity : {}", searchEntity);
        if (searchEntity.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SearchEntity result = searchEntityRepository.save(searchEntity);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, searchEntity.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /search-entities} : get all the searchEntities.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of searchEntities in body.
     */
    @GetMapping("/search-entities")
    public List<SearchEntity> getAllSearchEntities() {
        log.debug("REST request to get all SearchEntities");
        return searchEntityRepository.findAll();
    }

    /**
     * {@code GET  /search-entities/:id} : get the "id" searchEntity.
     *
     * @param id the id of the searchEntity to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the searchEntity, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/search-entities/{id}")
    public ResponseEntity<SearchEntity> getSearchEntity(@PathVariable Long id) {
        log.debug("REST request to get SearchEntity : {}", id);
        Optional<SearchEntity> searchEntity = searchEntityRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(searchEntity);
    }

    /**
     * {@code DELETE  /search-entities/:id} : delete the "id" searchEntity.
     *
     * @param id the id of the searchEntity to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/search-entities/{id}")
    public ResponseEntity<Void> deleteSearchEntity(@PathVariable Long id) {
        log.debug("REST request to delete SearchEntity : {}", id);
        searchEntityRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
