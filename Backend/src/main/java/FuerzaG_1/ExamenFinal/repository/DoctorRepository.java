package FuerzaG_1.ExamenFinal.Repository;

import FuerzaG_1.ExamenFinal.Entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}