package com.elasticapp.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A SearchEntity.
 */
@Entity
@Table(name = "search_entity")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SearchEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "link")
    private String link;

    @Column(name = "description")
    private String description;

    @Column(name = "tags")
    private String tags;

    @Column(name = "search_string")
    private String searchString;

    @Column(name = "quantity_clicks")
    private Integer quantityClicks;

    @Column(name = "source")
    private String source;

    @Column(name = "source_date")
    private LocalDate sourceDate;

    @Column(name = "smal_image")
    private String smalImage;

    @Column(name = "posted_by")
    private String postedBy;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @Column(name = "last_update")
    private LocalDate lastUpdate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public SearchEntity title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLink() {
        return link;
    }

    public SearchEntity link(String link) {
        this.link = link;
        return this;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getDescription() {
        return description;
    }

    public SearchEntity description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTags() {
        return tags;
    }

    public SearchEntity tags(String tags) {
        this.tags = tags;
        return this;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public String getSearchString() {
        return searchString;
    }

    public SearchEntity searchString(String searchString) {
        this.searchString = searchString;
        return this;
    }

    public void setSearchString(String searchString) {
        this.searchString = searchString;
    }

    public Integer getQuantityClicks() {
        return quantityClicks;
    }

    public SearchEntity quantityClicks(Integer quantityClicks) {
        this.quantityClicks = quantityClicks;
        return this;
    }

    public void setQuantityClicks(Integer quantityClicks) {
        this.quantityClicks = quantityClicks;
    }

    public String getSource() {
        return source;
    }

    public SearchEntity source(String source) {
        this.source = source;
        return this;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public LocalDate getSourceDate() {
        return sourceDate;
    }

    public SearchEntity sourceDate(LocalDate sourceDate) {
        this.sourceDate = sourceDate;
        return this;
    }

    public void setSourceDate(LocalDate sourceDate) {
        this.sourceDate = sourceDate;
    }

    public String getSmalImage() {
        return smalImage;
    }

    public SearchEntity smalImage(String smalImage) {
        this.smalImage = smalImage;
        return this;
    }

    public void setSmalImage(String smalImage) {
        this.smalImage = smalImage;
    }

    public String getPostedBy() {
        return postedBy;
    }

    public SearchEntity postedBy(String postedBy) {
        this.postedBy = postedBy;
        return this;
    }

    public void setPostedBy(String postedBy) {
        this.postedBy = postedBy;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public SearchEntity creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getLastUpdate() {
        return lastUpdate;
    }

    public SearchEntity lastUpdate(LocalDate lastUpdate) {
        this.lastUpdate = lastUpdate;
        return this;
    }

    public void setLastUpdate(LocalDate lastUpdate) {
        this.lastUpdate = lastUpdate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SearchEntity)) {
            return false;
        }
        return id != null && id.equals(((SearchEntity) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SearchEntity{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", link='" + getLink() + "'" +
            ", description='" + getDescription() + "'" +
            ", tags='" + getTags() + "'" +
            ", searchString='" + getSearchString() + "'" +
            ", quantityClicks=" + getQuantityClicks() +
            ", source='" + getSource() + "'" +
            ", sourceDate='" + getSourceDate() + "'" +
            ", smalImage='" + getSmalImage() + "'" +
            ", postedBy='" + getPostedBy() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", lastUpdate='" + getLastUpdate() + "'" +
            "}";
    }
}
