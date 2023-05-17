package springBoot_team_pj_126.dto;

import lombok.Data;

@Data
public class ChartDTO {
	private String label;
    private int value;
    private int average;
    private int max;
    private int min;

    // 생성자
    public ChartDTO(String label, int value) {
        this.label = label;
        this.value = value;
    }
    
    public ChartDTO(String label, int average, int max, int min) {
        this.label = label;
        this.average = average;
        this.max = max;
        this.min = min;
    }

}
