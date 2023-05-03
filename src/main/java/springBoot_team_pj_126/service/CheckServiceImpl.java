package springBoot_team_pj_126.service;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import springBoot_team_pj_126.dao.CheckMapper;
import springBoot_team_pj_126.dto.CheckDTO;
import springBoot_team_pj_126.dto.CheckOption;

@Service
public class CheckServiceImpl implements CheckService {

	@Autowired
	private CheckMapper mapper;
	
	// ========================================================
	// 현재 상태 확인
	@Override
	public int checkOutStatus() {
	    System.out.println("서비스 - checkOutStatus");
	    int selectCnt = 0;

	    CheckDTO dto = mapper.attendanceList();

	    // compareTimestamps 메소드를 호출하여 가장 마지막에 오는 변수가 goOut 변수인지 확인합니다.
	    selectCnt = compareTimestamps(dto);

	    System.out.println("selectCnt: " + selectCnt);

	    return selectCnt;
	}
	
	// 가장 마지막에 오는 옵션
	public static int compareTimestamps(CheckDTO dto) {
	    Timestamp latestTimestamp = null;
	    
    	Timestamp goOut = dto.getGoOut();

	    // DTO에 포함된 모든 Timestamp 변수를 추가합니다.
	    Timestamp[] timestamps = {
	        dto.getStartWork(),
	        dto.getMetting(),
	        dto.getGoOut(),
	        dto.getFieldWork(),
	        dto.getEndWork(),
	        dto.getEducation(),
	        dto.getBusinessTrip(),
	        dto.getRest(),
	        dto.getReturnWork(),
	        dto.getAttendanceDate()
	    };

	    for (Timestamp timestamp : timestamps) {
	        if (timestamp != null) {
	            if (latestTimestamp == null || timestamp.after(latestTimestamp)) {
	                latestTimestamp = timestamp;
	            }
	        }
	    }

	    // 가장 마지막에 오는 변수가 goOut 변수이면 1을 반환하고, 그렇지 않으면 0을 반환합니다.
	    if (latestTimestamp.equals(goOut)) {
	        return 1;
	    } else {
	        return 0;
	    }
	}
	
	// 출근 여부 확인
	@Override
	public int isStartWork() {
		System.out.println("서비스 - isStartWork");
		int selectCnt = 0;
		
		Timestamp isStartWork = mapper.isStartWork();
		if(isStartWork != null) {
			selectCnt = 1;
		}
		
		System.out.println("selectCnt: " + selectCnt);
		
		return selectCnt;
	}
	
	// 퇴근 여부 확인
	@Override
	public int isEndWork() {
		System.out.println("서비스 - isEndWork");
		int selectCnt = 0;
		
		Timestamp isEndWork = mapper.isEndWork();
		if(isEndWork != null) {
			selectCnt = 1;
		}
		
		System.out.println("selectCnt: " + selectCnt);
		
		return selectCnt;
	}
	
	// 근무 현황
	@Override
	public CheckOption attendanceList(HttpServletRequest req, Model model) {
	    System.out.println("서비스 - attendanceList");
	    CheckDTO dto = mapper.attendanceList();

	    CheckOption option = new CheckOption();
	    
	    try {
			
		    if (dto.getStartWork() != null) {
		        option.setStartWork(dto.getStartWork().toString());
		    }
		    if (dto.getMetting() != null) {
		        option.setMeeting(dto.getMetting().toString());
		    }
		    if (dto.getGoOut() != null) {
		        option.setGoOut(dto.getGoOut().toString());
		    }
		    if (dto.getFieldWork() != null) {
		        option.setFieldWork(dto.getFieldWork().toString());
		    }
		    if (dto.getEndWork() != null) {
		        option.setEndWork(dto.getEndWork().toString());
		    }
		    if (dto.getEducation() != null) {
		        option.setEducation(dto.getEducation().toString());
		    }
		    if (dto.getBusinessTrip() != null) {
		        option.setBusinessTrip(dto.getBusinessTrip().toString());
		    }
		    if (dto.getRest() != null) {
		        option.setRest(dto.getRest().toString());
		    }
		    if (dto.getReturnWork() != null) {
		        option.setReturnWork(dto.getReturnWork().toString());
		    }
		    
	    } catch (NullPointerException e) {
	    	System.out.println("리스트 없음");
		}

	    return option;
	}
	
	// 근무 체크 메서드
	@Override
	public int attendenceCheck(String id) 
			throws ServletException, IOException {
	    // JSON 문자열 파싱하여 JsonNode 객체 생성
	    ObjectMapper objectMapper = new ObjectMapper();
	    JsonNode jsonNode = objectMapper.readTree(id);

	    // "id" 프로퍼티의 값을 추출하여 변수에 저장
	    String attendenceID = jsonNode.get("id").asText();

	    int updateCnt = 0;
	    
	    // switch-case : 근무 체크 버튼 선택 판별
	    switch (attendenceID) {
	        case "start-work":
	        	updateCnt = mapper.startWork();
	            break;
	        case "meeting":
	        	updateCnt = mapper.meeting();
	            break;
	        case "go-out":
	        	updateCnt = mapper.goOut();
	            break;
	        case "field-work":
	        	updateCnt = mapper.fieldWork();
	        	break;
	        case "end-work":
	        	updateCnt = mapper.endWork();
	            break;
	        case "education":
	        	updateCnt = mapper.education();
	            break;
	        case "business-trip":
	        	updateCnt = mapper.businessTrip();
	            break;
	        case "rest":
	        	updateCnt = mapper.rest();
	        case "return-work":
	        	updateCnt = mapper.returnWork();
	            break;
	        default:
	            System.out.println("알수없는 요청");
	    }
	    
		return updateCnt;
	}
	
	// ========================================================
	// 근무 시간
	
	@Override
	public Map<String, Object> getDate() {
		Map<String, Object> data = new HashMap<>();
		
		// #TODO - DTO에 넣어서 보내야할지 고민해보기
		int totalDays = mapper.totalDays();
		int totalHours = mapper.totalHours();
		
		data.put("totalHours", totalHours);
		data.put("totalDays", totalDays);
		
		return data;
	}

	// 근태 현황
	@Override
	public Map<String, Object> getAttendance() {
		Map<String, Object> data = new HashMap<>();
  
		// #TODO - 결근 어떻게 처리할지 고민해보기
		int tardy = mapper.tardy();
		int absenteeism = 0;
		int earlyDeparture = mapper.earlyDeparture();
		int unchecked = mapper.unchecked();
  
		data.put("tardy", tardy);
		data.put("absenteeism", absenteeism);
		data.put("earlyDeparture", earlyDeparture);
		data.put("unchecked", unchecked);
		
		return data;
	}

}
