package com.elasticapp.repository;

import com.elasticapp.domain.SearchEntity;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SearchEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SearchEntityRepository extends JpaRepository<SearchEntity, Long> {

}
