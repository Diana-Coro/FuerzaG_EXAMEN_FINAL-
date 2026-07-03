package FuerzaG_1.ExamenFinal.repository;

import FuerzaG_1.ExamenFinal.model.Afiliado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AfiliadoRepository extends JpaRepository<Afiliado, Long> {
    // JpaRepository ya incluye buscar por ID, guardar, eliminar y listar todo.
}