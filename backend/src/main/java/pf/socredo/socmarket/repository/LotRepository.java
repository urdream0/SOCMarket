package pf.socredo.socmarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pf.socredo.socmarket.entity.LotEntity;

public interface LotRepository extends JpaRepository<LotEntity, Long> {}
