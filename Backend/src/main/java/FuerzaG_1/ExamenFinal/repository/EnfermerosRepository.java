package FuerzaG_1.ExamenFinal.repository;

import FuerzaG_1.ExamenFinal.entity.EnfermerosEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnfermerosRepository extends JpaRepository<EnfermerosEntity, Integer> {
}

