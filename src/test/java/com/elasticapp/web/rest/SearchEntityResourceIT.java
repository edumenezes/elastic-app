package com.elasticapp.web.rest;

import com.elasticapp.ElasticApp;
import com.elasticapp.domain.SearchEntity;
import com.elasticapp.repository.SearchEntityRepository;
import com.elasticapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.elasticapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link SearchEntityResource} REST controller.
 */
@SpringBootTest(classes = ElasticApp.class)
public class SearchEntityResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_LINK = "AAAAAAAAAA";
    private static final String UPDATED_LINK = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_TAGS = "AAAAAAAAAA";
    private static final String UPDATED_TAGS = "BBBBBBBBBB";

    private static final String DEFAULT_SEARCH_STRING = "AAAAAAAAAA";
    private static final String UPDATED_SEARCH_STRING = "BBBBBBBBBB";

    private static final Integer DEFAULT_QUANTITY_CLICKS = 1;
    private static final Integer UPDATED_QUANTITY_CLICKS = 2;

    private static final String DEFAULT_SOURCE = "AAAAAAAAAA";
    private static final String UPDATED_SOURCE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_SOURCE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_SOURCE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_SMAL_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_SMAL_IMAGE = "BBBBBBBBBB";

    private static final String DEFAULT_POSTED_BY = "AAAAAAAAAA";
    private static final String UPDATED_POSTED_BY = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_LAST_UPDATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_UPDATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private SearchEntityRepository searchEntityRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restSearchEntityMockMvc;

    private SearchEntity searchEntity;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SearchEntityResource searchEntityResource = new SearchEntityResource(searchEntityRepository);
        this.restSearchEntityMockMvc = MockMvcBuilders.standaloneSetup(searchEntityResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SearchEntity createEntity(EntityManager em) {
        SearchEntity searchEntity = new SearchEntity()
            .title(DEFAULT_TITLE)
            .link(DEFAULT_LINK)
            .description(DEFAULT_DESCRIPTION)
            .tags(DEFAULT_TAGS)
            .searchString(DEFAULT_SEARCH_STRING)
            .quantityClicks(DEFAULT_QUANTITY_CLICKS)
            .source(DEFAULT_SOURCE)
            .sourceDate(DEFAULT_SOURCE_DATE)
            .smalImage(DEFAULT_SMAL_IMAGE)
            .postedBy(DEFAULT_POSTED_BY)
            .creationDate(DEFAULT_CREATION_DATE)
            .lastUpdate(DEFAULT_LAST_UPDATE);
        return searchEntity;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SearchEntity createUpdatedEntity(EntityManager em) {
        SearchEntity searchEntity = new SearchEntity()
            .title(UPDATED_TITLE)
            .link(UPDATED_LINK)
            .description(UPDATED_DESCRIPTION)
            .tags(UPDATED_TAGS)
            .searchString(UPDATED_SEARCH_STRING)
            .quantityClicks(UPDATED_QUANTITY_CLICKS)
            .source(UPDATED_SOURCE)
            .sourceDate(UPDATED_SOURCE_DATE)
            .smalImage(UPDATED_SMAL_IMAGE)
            .postedBy(UPDATED_POSTED_BY)
            .creationDate(UPDATED_CREATION_DATE)
            .lastUpdate(UPDATED_LAST_UPDATE);
        return searchEntity;
    }

    @BeforeEach
    public void initTest() {
        searchEntity = createEntity(em);
    }

    @Test
    @Transactional
    public void createSearchEntity() throws Exception {
        int databaseSizeBeforeCreate = searchEntityRepository.findAll().size();

        // Create the SearchEntity
        restSearchEntityMockMvc.perform(post("/api/search-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(searchEntity)))
            .andExpect(status().isCreated());

        // Validate the SearchEntity in the database
        List<SearchEntity> searchEntityList = searchEntityRepository.findAll();
        assertThat(searchEntityList).hasSize(databaseSizeBeforeCreate + 1);
        SearchEntity testSearchEntity = searchEntityList.get(searchEntityList.size() - 1);
        assertThat(testSearchEntity.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testSearchEntity.getLink()).isEqualTo(DEFAULT_LINK);
        assertThat(testSearchEntity.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testSearchEntity.getTags()).isEqualTo(DEFAULT_TAGS);
        assertThat(testSearchEntity.getSearchString()).isEqualTo(DEFAULT_SEARCH_STRING);
        assertThat(testSearchEntity.getQuantityClicks()).isEqualTo(DEFAULT_QUANTITY_CLICKS);
        assertThat(testSearchEntity.getSource()).isEqualTo(DEFAULT_SOURCE);
        assertThat(testSearchEntity.getSourceDate()).isEqualTo(DEFAULT_SOURCE_DATE);
        assertThat(testSearchEntity.getSmalImage()).isEqualTo(DEFAULT_SMAL_IMAGE);
        assertThat(testSearchEntity.getPostedBy()).isEqualTo(DEFAULT_POSTED_BY);
        assertThat(testSearchEntity.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testSearchEntity.getLastUpdate()).isEqualTo(DEFAULT_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void createSearchEntityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = searchEntityRepository.findAll().size();

        // Create the SearchEntity with an existing ID
        searchEntity.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSearchEntityMockMvc.perform(post("/api/search-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(searchEntity)))
            .andExpect(status().isBadRequest());

        // Validate the SearchEntity in the database
        List<SearchEntity> searchEntityList = searchEntityRepository.findAll();
        assertThat(searchEntityList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSearchEntities() throws Exception {
        // Initialize the database
        searchEntityRepository.saveAndFlush(searchEntity);

        // Get all the searchEntityList
        restSearchEntityMockMvc.perform(get("/api/search-entities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(searchEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].link").value(hasItem(DEFAULT_LINK.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].tags").value(hasItem(DEFAULT_TAGS.toString())))
            .andExpect(jsonPath("$.[*].searchString").value(hasItem(DEFAULT_SEARCH_STRING.toString())))
            .andExpect(jsonPath("$.[*].quantityClicks").value(hasItem(DEFAULT_QUANTITY_CLICKS)))
            .andExpect(jsonPath("$.[*].source").value(hasItem(DEFAULT_SOURCE.toString())))
            .andExpect(jsonPath("$.[*].sourceDate").value(hasItem(DEFAULT_SOURCE_DATE.toString())))
            .andExpect(jsonPath("$.[*].smalImage").value(hasItem(DEFAULT_SMAL_IMAGE.toString())))
            .andExpect(jsonPath("$.[*].postedBy").value(hasItem(DEFAULT_POSTED_BY.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastUpdate").value(hasItem(DEFAULT_LAST_UPDATE.toString())));
    }
    
    @Test
    @Transactional
    public void getSearchEntity() throws Exception {
        // Initialize the database
        searchEntityRepository.saveAndFlush(searchEntity);

        // Get the searchEntity
        restSearchEntityMockMvc.perform(get("/api/search-entities/{id}", searchEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(searchEntity.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.link").value(DEFAULT_LINK.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.tags").value(DEFAULT_TAGS.toString()))
            .andExpect(jsonPath("$.searchString").value(DEFAULT_SEARCH_STRING.toString()))
            .andExpect(jsonPath("$.quantityClicks").value(DEFAULT_QUANTITY_CLICKS))
            .andExpect(jsonPath("$.source").value(DEFAULT_SOURCE.toString()))
            .andExpect(jsonPath("$.sourceDate").value(DEFAULT_SOURCE_DATE.toString()))
            .andExpect(jsonPath("$.smalImage").value(DEFAULT_SMAL_IMAGE.toString()))
            .andExpect(jsonPath("$.postedBy").value(DEFAULT_POSTED_BY.toString()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.lastUpdate").value(DEFAULT_LAST_UPDATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSearchEntity() throws Exception {
        // Get the searchEntity
        restSearchEntityMockMvc.perform(get("/api/search-entities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSearchEntity() throws Exception {
        // Initialize the database
        searchEntityRepository.saveAndFlush(searchEntity);

        int databaseSizeBeforeUpdate = searchEntityRepository.findAll().size();

        // Update the searchEntity
        SearchEntity updatedSearchEntity = searchEntityRepository.findById(searchEntity.getId()).get();
        // Disconnect from session so that the updates on updatedSearchEntity are not directly saved in db
        em.detach(updatedSearchEntity);
        updatedSearchEntity
            .title(UPDATED_TITLE)
            .link(UPDATED_LINK)
            .description(UPDATED_DESCRIPTION)
            .tags(UPDATED_TAGS)
            .searchString(UPDATED_SEARCH_STRING)
            .quantityClicks(UPDATED_QUANTITY_CLICKS)
            .source(UPDATED_SOURCE)
            .sourceDate(UPDATED_SOURCE_DATE)
            .smalImage(UPDATED_SMAL_IMAGE)
            .postedBy(UPDATED_POSTED_BY)
            .creationDate(UPDATED_CREATION_DATE)
            .lastUpdate(UPDATED_LAST_UPDATE);

        restSearchEntityMockMvc.perform(put("/api/search-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSearchEntity)))
            .andExpect(status().isOk());

        // Validate the SearchEntity in the database
        List<SearchEntity> searchEntityList = searchEntityRepository.findAll();
        assertThat(searchEntityList).hasSize(databaseSizeBeforeUpdate);
        SearchEntity testSearchEntity = searchEntityList.get(searchEntityList.size() - 1);
        assertThat(testSearchEntity.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testSearchEntity.getLink()).isEqualTo(UPDATED_LINK);
        assertThat(testSearchEntity.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testSearchEntity.getTags()).isEqualTo(UPDATED_TAGS);
        assertThat(testSearchEntity.getSearchString()).isEqualTo(UPDATED_SEARCH_STRING);
        assertThat(testSearchEntity.getQuantityClicks()).isEqualTo(UPDATED_QUANTITY_CLICKS);
        assertThat(testSearchEntity.getSource()).isEqualTo(UPDATED_SOURCE);
        assertThat(testSearchEntity.getSourceDate()).isEqualTo(UPDATED_SOURCE_DATE);
        assertThat(testSearchEntity.getSmalImage()).isEqualTo(UPDATED_SMAL_IMAGE);
        assertThat(testSearchEntity.getPostedBy()).isEqualTo(UPDATED_POSTED_BY);
        assertThat(testSearchEntity.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testSearchEntity.getLastUpdate()).isEqualTo(UPDATED_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void updateNonExistingSearchEntity() throws Exception {
        int databaseSizeBeforeUpdate = searchEntityRepository.findAll().size();

        // Create the SearchEntity

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSearchEntityMockMvc.perform(put("/api/search-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(searchEntity)))
            .andExpect(status().isBadRequest());

        // Validate the SearchEntity in the database
        List<SearchEntity> searchEntityList = searchEntityRepository.findAll();
        assertThat(searchEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSearchEntity() throws Exception {
        // Initialize the database
        searchEntityRepository.saveAndFlush(searchEntity);

        int databaseSizeBeforeDelete = searchEntityRepository.findAll().size();

        // Delete the searchEntity
        restSearchEntityMockMvc.perform(delete("/api/search-entities/{id}", searchEntity.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SearchEntity> searchEntityList = searchEntityRepository.findAll();
        assertThat(searchEntityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SearchEntity.class);
        SearchEntity searchEntity1 = new SearchEntity();
        searchEntity1.setId(1L);
        SearchEntity searchEntity2 = new SearchEntity();
        searchEntity2.setId(searchEntity1.getId());
        assertThat(searchEntity1).isEqualTo(searchEntity2);
        searchEntity2.setId(2L);
        assertThat(searchEntity1).isNotEqualTo(searchEntity2);
        searchEntity1.setId(null);
        assertThat(searchEntity1).isNotEqualTo(searchEntity2);
    }
}
