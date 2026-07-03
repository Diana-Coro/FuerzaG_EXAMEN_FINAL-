package FuerzaG_1.ExamenFinal.service;

import FuerzaG_1.ExamenFinal.entity.Institucionentity;
import FuerzaG_1.ExamenFinal.repository.Institucionrepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Institucionservice {

    @Autowired
    private Institucionrepository institucionrepository;

    public List<Institucionentity> listar() {
        return institucionrepository.findAll();
    }

    public Institucionentity buscarPorId(Integer id) {
        return institucionrepository.findById(id).orElse(null);
    }

    public Institucionentity guardar(Institucionentity institucion) {
        return institucionrepository.save(institucion);
    }

    public Institucionentity actualizar(Integer id, Institucionentity institucion) {
        Institucionentity existente = institucionrepository.findById(id).orElse(null);

        if (existente != null) {
            existente.setInstitucion(institucion.getInstitucion());
            existente.setReferencias(institucion.getReferencias());
            return institucionrepository.save(existente);
        }

        return null;
    }

    public void eliminar(Integer id) {
        institucionrepository.deleteById(id);
    }
}