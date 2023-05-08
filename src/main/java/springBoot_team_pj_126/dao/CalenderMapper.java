package springBoot_team_pj_126.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import springBoot_team_pj_126.dto.CalenderDTO;



@Mapper
public interface CalenderMapper {
	
	//리스트
	public List<CalenderDTO> calenderList(String id);
	//추가
	public void inserCalender(CalenderDTO calenderDTO);
	
	public void updateCalender(CalenderDTO calenderDTO);
	//삭제
	public void deleteById(String title);
	
	public CalenderDTO findById (String userid);
	
	//부석현
	public CalenderDTO getContent(String id);

}
