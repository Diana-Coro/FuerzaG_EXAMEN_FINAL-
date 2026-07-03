package FuerzaG_1.ExamenFinal.repository;

import FuerzaG_1.ExamenFinal.entity.Institucionentity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Institucionrepository extends JpaRepository<Institucionentity, Integer> {

}