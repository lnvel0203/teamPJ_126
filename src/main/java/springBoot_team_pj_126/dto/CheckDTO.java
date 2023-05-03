package springBoot_team_pj_126.dto;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Entity
@Table(name="attendence_tbl")
@Data
public class CheckDTO {
	@Id
	private int attendenceID;
	private String id;
	private Timestamp startWork;		// 출근
	private Timestamp metting;			// 회의
	private Timestamp goOut;			// 외출
	private Timestamp fieldWork;		// 외근
	private Timestamp endWork;			// 퇴근
	private Timestamp education;		// 교육
	private Timestamp businessTrip;		// 출장
	private Timestamp rest;				// 휴식
	private Timestamp returnWork;		// 복귀
	private Timestamp attendanceDate;	// 날짜
	
	// #삭제 =======================================
	
	public int getAttendenceID() {
		return attendenceID;
	}
	public void setAttendenceID(int attendenceID) {
		this.attendenceID = attendenceID;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Timestamp getStartWork() {
		return startWork;
	}
	public void setStartWork(Timestamp startWork) {
		this.startWork = startWork;
	}
	public Timestamp getMetting() {
		return metting;
	}
	public void setMetting(Timestamp metting) {
		this.metting = metting;
	}
	public Timestamp getGoOut() {
		return goOut;
	}
	public void setGoOut(Timestamp goOut) {
		this.goOut = goOut;
	}
	public Timestamp getFieldWork() {
		return fieldWork;
	}
	public void setFieldWork(Timestamp fieldWork) {
		this.fieldWork = fieldWork;
	}
	public Timestamp getEndWork() {
		return endWork;
	}
	public void setEndWork(Timestamp endWork) {
		this.endWork = endWork;
	}
	public Timestamp getEducation() {
		return education;
	}
	public void setEducation(Timestamp education) {
		this.education = education;
	}
	public Timestamp getBusinessTrip() {
		return businessTrip;
	}
	public void setBusinessTrip(Timestamp businessTrip) {
		this.businessTrip = businessTrip;
	}
	public Timestamp getRest() {
		return rest;
	}
	public void setRest(Timestamp rest) {
		this.rest = rest;
	}
	public Timestamp getReturnWork() {
		return returnWork;
	}
	public void setReturnWork(Timestamp returnWork) {
		this.returnWork = returnWork;
	}
	public Timestamp getAttendanceDate() {
		return attendanceDate;
	}
	public void setAttendanceDate(Timestamp attendanceDate) {
		this.attendanceDate = attendanceDate;
	}
	
	// # ==========================================
	
}
