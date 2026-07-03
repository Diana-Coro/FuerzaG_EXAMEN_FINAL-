package FuerzaG_1.ExamenFinal.Repository;

import FuerzaG_1.ExamenFinal.Entity.EnfermerosEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnfermerosRepository extends JpaRepository<EnfermerosEntity, Integer> {
}

