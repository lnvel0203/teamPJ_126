package springBoot_team_pj_126.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import springBoot_team_pj_126.dto.BoardDTO;

@Mapper
public interface BoardMapper {

	public List<BoardDTO> boardList();
	
	public int insertBoard(BoardDTO dto);
	
	public int deleteBoard(int boardNo);
	
	public BoardDTO getBoard(int boardNo);
}
