package FuerzaG_1.ExamenFinal.repository;
import FuerzaG_1.ExamenFinal.entity.PacientesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PacientesRepository extends JpaRepository<PacientesEntity, Integer> {
}
