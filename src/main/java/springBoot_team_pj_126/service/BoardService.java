package springBoot_team_pj_126.service;

import java.util.List;

import springBoot_team_pj_126.dto.BoardDTO;


public interface BoardService {

	public List<BoardDTO> boardList();
		
	public int insertBoard(BoardDTO dto, String id);
	
	public int deleteBoard(int boardNo);
	
	public BoardDTO getBoard(int boardNo);
	
}
