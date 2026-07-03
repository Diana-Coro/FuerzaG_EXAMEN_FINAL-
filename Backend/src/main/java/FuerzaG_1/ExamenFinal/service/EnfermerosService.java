package FuerzaG_1.ExamenFinal.Service;

import FuerzaG_1.ExamenFinal.Entity.EnfermerosEntity;
import FuerzaG_1.ExamenFinal.Repository.EnfermerosRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnfermerosService {

    private final EnfermerosRepository repository;

    public EnfermerosService(EnfermerosRepository repository) {
        this.repository = repository;
    }

    public List<EnfermerosEntity> listar() {
        return repository.findAll();
    }

    public Optional<EnfermerosEntity> buscar(Integer id) {
        return repository.findById(id);
    }

    public EnfermerosEntity guardar(EnfermerosEntity enfermero) {
        return repository.save(enfermero);
    }

    public void eliminar(Integer id) {
        repository.deleteById(id);
    }
}
