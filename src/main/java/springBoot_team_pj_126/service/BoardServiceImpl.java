package springBoot_team_pj_126.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springBoot_team_pj_126.dao.BoardMapper;
import springBoot_team_pj_126.dto.BoardDTO;
@Service
public class BoardServiceImpl implements BoardService{

	
	@Autowired
	private BoardMapper mapper;
	
	@Override
	public List<BoardDTO> boardList() {
		
		
		List<BoardDTO> list = mapper.boardList();
		
		return list;
	}
	
	@Override
	public int insertBoard(BoardDTO dto, String id) {

		int boardCnt = 0;
		dto.setId(id);
		boardCnt = mapper.insertBoard(dto);
		
		return boardCnt;
	}
	
	@Override
	public int deleteBoard(int boardNo) {

		int boardCnt = 0;
	
		boardCnt = mapper.deleteBoard(boardNo);
		
		return boardCnt;
	}

	@Override
	public BoardDTO getBoard(int boardNo) {
		
		BoardDTO dto = mapper.getBoard(boardNo);
		
		return dto;
	}

	
}
