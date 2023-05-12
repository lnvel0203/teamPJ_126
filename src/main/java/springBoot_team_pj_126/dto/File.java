package springBoot_team_pj_126.dto;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="FILES")
public class File {
	
	@Id
    private Long id;
    private String name;
    private String path;
    private LocalDateTime uploadTime;
    
}