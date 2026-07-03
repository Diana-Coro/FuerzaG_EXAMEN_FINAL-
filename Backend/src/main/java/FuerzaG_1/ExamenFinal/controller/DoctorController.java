package FuerzaG_1.ExamenFinal.Controller;

import FuerzaG_1.ExamenFinal.Entity.Doctor;
import FuerzaG_1.ExamenFinal.Services.DoctorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctores")
@CrossOrigin(origins = "*")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping
    public List<Doctor> listarDoctores() {
        return doctorService.listarDoctores();
    }

    @GetMapping("/{id}")
    public Doctor buscarDoctorPorId(@PathVariable Long id) {
        return doctorService.buscarDoctorPorId(id);
    }

    @PostMapping
    public Doctor guardarDoctor(@RequestBody Doctor doctor) {
        return doctorService.guardarDoctor(doctor);
    }

    @PutMapping("/{id}")
    public Doctor actualizarDoctor(@PathVariable Long id, @RequestBody Doctor doctor) {
        return doctorService.actualizarDoctor(id, doctor);
    }

    @DeleteMapping("/{id}")
    public void eliminarDoctor(@PathVariable Long id) {
        doctorService.eliminarDoctor(id);
    }
}