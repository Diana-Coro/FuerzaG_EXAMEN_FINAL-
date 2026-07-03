package FuerzaG_1.ExamenFinal.Entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Enfermeros")
public class EnfermerosEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(hidden = true)
    private Integer id;

    private String nombre;

    @Temporal(TemporalType.DATE)
    private LocalDate fechaIngreso;

    private String area;

    private String celular;

    public EnfermerosEntity() {
    }

    public EnfermerosEntity(Integer id, String nombre, LocalDate fechaIngreso, String area, String celular) {
        this.id = id;
        this.nombre = nombre;
        this.fechaIngreso = fechaIngreso;
        this.area = area;
        this.celular = celular;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public LocalDate getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(LocalDate fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getCellular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }
}
