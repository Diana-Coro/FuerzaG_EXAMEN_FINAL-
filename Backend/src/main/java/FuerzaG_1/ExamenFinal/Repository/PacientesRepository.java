package FuerzaG_1.ExamenFinal.Repository;
import FuerzaG_1.ExamenFinal.Entity.PacientesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PacientesRepository extends JpaRepository<PacientesEntity, Integer> {
}
