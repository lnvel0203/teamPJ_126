package springBoot_team_pj_126.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springBoot_team_pj_126.dto.BoardDTO;
import springBoot_team_pj_126.service.BoardService;

@RequestMapping(value="/members")
@RestController
public class BoardController {
	
	@Autowired
	private BoardService service; 
	
	private static final Logger logger = LoggerFactory.getLogger(BoardController.class);
	@GetMapping("/boardList")
	public List<BoardDTO> statusList() {
		logger.info("AttendanceController - statusList()");
		
		List<BoardDTO> list = service.boardList();
		
		
		return list;
	}
	@PostMapping("/insertBoard/{id}")
	public int insertBoard(@RequestBody BoardDTO dto, @PathVariable String id) {
		logger.info("AttendanceController - insertBoard()");
		int boardCnt = 0;
		boardCnt = service.insertBoard(dto, id);
		
		
		return boardCnt;
	}
	
	@DeleteMapping("/deleteBoard/{boardNo}")
	public int deleteBoard(@PathVariable int boardNo) {
	
		logger.info("AttendanceController - deleteBoard()");
		int boardCnt = 0;
		boardCnt = service.deleteBoard(boardNo);
		
		
		return boardCnt;
	}
	
	@GetMapping("/getBoard/{boardNo}")
	public BoardDTO getBoard(@PathVariable int boardNo) {
	
		BoardDTO dto = service.getBoard(boardNo);
		
		return dto;
	}
}
