package springBoot_team_pj_126.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import springBoot_team_pj_126.dto.DocumentDTO;
import springBoot_team_pj_126.dto.UserDTO;
import springBoot_team_pj_126.service.DocumentService;

@RequestMapping(value = "/members")
@RestController
public class DocumentController {

	@Autowired(required = true)
	private DocumentService service;
	// http://localhost:8081/members
	// localhost:8080/members =>가 첫 url인데

	// 결재대기 목록
	@GetMapping("/ApprovalPendingList/{id}")
	public List<DocumentDTO> getApprovalPendingList(@PathVariable String id) throws ServletException, IOException {
		System.out.println("컨트롤러 - ApprovalPendingList");
		System.out.println("id" + id);
		List<DocumentDTO> list = service.getApprovalPendingList(id);
		System.out.println("list : " + list);

		return list;
	}

	// 결재예정 목록
	@GetMapping("/ApprovalScheduledList/{id}")
	public List<DocumentDTO> getApprovalScheduledList(@PathVariable String id) throws ServletException, IOException {
		System.out.println("컨트롤러 - ApprovalScheduledList");
		System.out.println("id" + id);
		List<DocumentDTO> list = service.getApprovalScheduledList(id);
		System.out.println("list : " + list);

		return list;
	}

	// 결재완료 목록
	@GetMapping("/ApprovalCompletedList/{id}")
	public List<DocumentDTO> getApprovalCompletedList(@PathVariable String id) throws ServletException, IOException {
		System.out.println("컨트롤러 - ApprovalCompletedList");
		System.out.println("id" + id);
		List<DocumentDTO> list = service.getApprovalCompletedList(id);
		System.out.println("list : " + list);

		return list;
	}

	// 기안 문서 목록
	@GetMapping("/DraftDocumentList/{id}")
	public List<DocumentDTO> getDraftDocumentList(@PathVariable String id) throws ServletException, IOException {
		System.out.println("컨트롤러 - DraftDocumentList");
		System.out.println("id" + id);
		List<DocumentDTO> list = service.getDraftDocumentList(id);
		System.out.println("list : " + list);

		return list;
	}

	// 반려 문서 목록
	@GetMapping("/RejectionDocumentList/{id}")
	public List<DocumentDTO> getRejectionDocumentList(@PathVariable String id) throws ServletException, IOException {
		System.out.println("컨트롤러 - RejectionDocumentList");
		System.out.println("id" + id);
		List<DocumentDTO> list = service.getRejectionDocumentList(id);
		System.out.println("list : " + list);

		return list;
	}

	// 결재서류 상세페이지
	@GetMapping("/documentDetail/{documentNo}")
	public DocumentDTO documentDetail(@PathVariable int documentNo) throws ServletException, IOException {
		System.out.println("controller - documentDetail");
		System.out.println("documentNO" + documentNo);
		DocumentDTO dto = service.documentDetail(documentNo);
		System.out.println("dto" + dto);
		return dto;
	}
	
	// 결재서류 상세페이지
	@GetMapping("/vacationDocumentDetail/{documentNo}")
	public DocumentDTO vacationDocumentDetail(@PathVariable int documentNo) throws ServletException, IOException {
		System.out.println("controller - documentDetail");
		System.out.println("documentNO" + documentNo);
		DocumentDTO dto = service.documentDetail(documentNo);
		System.out.println("dto" + dto);
		return dto;
	}

	// 결재자 목록
	@GetMapping("/approver")
	public List<UserDTO> ApproverList(HttpServletRequest req, Model model) throws ServletException, IOException {
		System.out.println("컨트롤러 - ApproverList");
		List<UserDTO> list = service.approverList(req, model);
		System.out.println("list : " + list);
		return service.approverList(req, model);
	}

	// 휴가서류 등록
	@PostMapping("/addVacationDocument")
	public void addDocument(@RequestParam(value = "fileData", required = false) MultipartFile fileData,
			@RequestParam(value = "approverNo0", required = false) Integer storedApprover0,
			@RequestParam(value = "approverNo1", required = false) Integer storedApprover1,
			@RequestParam(value = "approverNo2", required = false) Integer storedApprover2,
			@RequestParam(value = "approverNo3", required = false) Integer storedApprover3,
			@RequestParam("documentType") String documentType, @RequestParam("author") String author,
			@RequestParam("retentionPeriod") String retentionPeriod,
			@RequestParam("securityLevel") String securityLevel, @RequestParam("title") String title,
			@RequestParam("content") String content, @RequestParam("id") String id,
			@RequestParam(value = "vacationDate", required = false) String vacationDate,
			@RequestParam(value = "startDate", required = false) Date startDate,
			@RequestParam(value = "endDate", required = false) Date endDate, DocumentDTO dto)
			throws ServletException, IOException {

		System.out.println("addVacationDocument controller");
		File directory = new File("C:/Users/KOSMO/Desktop/파일저장");
		if (!directory.exists()) {
			directory.mkdirs(); // 폴더가 존재하지 않는 경우, 폴더를 생성합니다.
		}

		// 파일 처리 로직
		if (fileData != null && !fileData.isEmpty()) {
			try {
				String fileName = fileData.getOriginalFilename();
				File file = new File(directory + "/" + fileName);
				fileData.transferTo(file);
				System.out.println("File saved: " + file.getAbsolutePath());

				// 저장된 파일의 경로를 dto 객체에 설정
				dto.setFilePath(file.getAbsolutePath());
			} catch (IOException e) {
				System.err.println("File save error: " + e.getMessage());
			}
		}

		Integer[] approverNos = { storedApprover0, storedApprover1, storedApprover2, storedApprover3 };

		for (int i = 0; i < approverNos.length; i++) {
			if (approverNos[i] != null) {
				switch (i) {
				case 0:
					dto.setFirstApproverNo(approverNos[i]);
					break;
				case 1:
					dto.setSecondApproverNo(approverNos[i]);
					break;
				case 2:
					dto.setThirdApproverNo(approverNos[i]);
					break;
				case 3:
					dto.setFourthApproverNo(approverNos[i]);
					break;
				}
			}
		}
		dto.setDocumentType(documentType);
		dto.setAuthor(author);
		dto.setRetentionPeriod(retentionPeriod);
		dto.setSecurityLevel(securityLevel);
		dto.setTitle(title);
		dto.setContent(content);
		dto.setId(id);
		System.out.println("startdate " + startDate);
		System.out.println("vacationDate" + vacationDate);
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		dto.setStartDate(formatter.format(startDate));
		dto.setEndDate(formatter.format(endDate));
		dto.setVacationDate(vacationDate);
		System.out.println("휴가를가? 차감한다 ");
		service.vacationDeduction(dto);
		System.out.println("차감완료");

		System.out.println("storedApprover0: " + storedApprover0);
		System.out.println(dto);
		service.addVacationDocument(dto);
		System.out.println("등록성공");
	}

	// 결재서류 등록
	@PostMapping("/addDocument")
	public void addDocument(@RequestParam(value = "fileData", required = false) MultipartFile fileData,

			// 결재선 - 인원
			@RequestParam(value = "approverNo0", required = false) Integer storedApprover0,
			@RequestParam(value = "approverNo1", required = false) Integer storedApprover1,
			@RequestParam(value = "approverNo2", required = false) Integer storedApprover2,
			@RequestParam(value = "approverNo3", required = false) Integer storedApprover3,
			@RequestParam("documentType") String documentType, @RequestParam("author") String author,
			@RequestParam("retentionPeriod") String retentionPeriod,
			@RequestParam("securityLevel") String securityLevel, @RequestParam("title") String title,
			@RequestParam("content") String content, @RequestParam("id") String id, DocumentDTO dto)
			throws ServletException, IOException {

		// 새폴더
		File directory = new File("C:/Users/KOSMO/Desktop/파일저장");
		if (!directory.exists()) {
			directory.mkdirs(); // 폴더가 존재하지 않는 경우, 폴더를 생성합니다.
		}

		// 파일 처리 로직
		if (fileData != null && !fileData.isEmpty()) {
			try {
				String fileName = fileData.getOriginalFilename();
				File file = new File(directory + "/" + fileName);
				fileData.transferTo(file);
				System.out.println("File saved: " + file.getAbsolutePath());

				// 저장된 파일의 경로를 dto 객체에 설정
				dto.setFilePath(file.getAbsolutePath());
			} catch (IOException e) {
				System.err.println("File save error: " + e.getMessage());
			}
		}

		Integer[] approverNos = { storedApprover0, storedApprover1, storedApprover2, storedApprover3 };

		for (int i = 0; i < approverNos.length; i++) {
			if (approverNos[i] != null) {
				switch (i) {
				case 0:
					dto.setFirstApproverNo(approverNos[i]);
					break;
				case 1:
					dto.setSecondApproverNo(approverNos[i]);
					break;
				case 2:
					dto.setThirdApproverNo(approverNos[i]);
					break;
				case 3:
					dto.setFourthApproverNo(approverNos[i]);
					break;
				}
			}
		}
		dto.setDocumentType(documentType);
		dto.setAuthor(author);
		dto.setRetentionPeriod(retentionPeriod);
		dto.setSecurityLevel(securityLevel);
		dto.setTitle(title);
		dto.setContent(content);
		dto.setId(id);

		System.out.println("storedApprover0: " + storedApprover0);
		System.out.println(dto);
		service.addDocument(dto);
		System.out.println("등록성공");
	}

	// 결재서류 수정
	@PostMapping("/updateDocument")
	public void updateDocument(@RequestParam(value = "fileData", required = false) MultipartFile fileData,
			@RequestParam("documentType") String documentType, @RequestParam("author") String author,
			@RequestParam("retentionPeriod") String retentionPeriod,
			@RequestParam("securityLevel") String securityLevel, @RequestParam("title") String title,
			@RequestParam("content") String content, @RequestParam("id") String id,
			@RequestParam("documentState") String documentState, @RequestParam("documentNo") int documentNo)
			throws ServletException, IOException {

		DocumentDTO dto = service.getDocument(documentNo);
		File directory = new File("C:/Users/KOSMO/Desktop/파일저장");
		if (!directory.exists()) {
			directory.mkdirs(); // 폴더가 존재하지 않는 경우, 폴더를 생성합니다.
		}

		// 파일 처리 로직
		if (fileData != null && !fileData.isEmpty()) {
			try {
				String fileName = fileData.getOriginalFilename();
				File file = new File(directory + "/" + fileName);
				fileData.transferTo(file);
				System.out.println("File saved: " + file.getAbsolutePath());

				// 저장된 파일의 경로를 dto 객체에 설정
				dto.setFilePath(file.getAbsolutePath());
			} catch (IOException e) {
				System.err.println("File save error: " + e.getMessage());
			}
		}

		dto.setDocumentType(documentType);
		dto.setAuthor(author);
		dto.setRetentionPeriod(retentionPeriod);
		dto.setSecurityLevel(securityLevel);
		dto.setTitle(title);
		dto.setContent(content);
		dto.setId(id);
		service.updateDocument(dto);
		System.out.println("수정성공");
	}

	// 휴가서류 수정
	@PostMapping("/updateVacationDocument")
	public void updateDocument(@RequestParam(value = "fileData", required = false) MultipartFile fileData,
			@RequestParam("documentType") String documentType, @RequestParam("author") String author,
			@RequestParam("retentionPeriod") String retentionPeriod,
			@RequestParam("securityLevel") String securityLevel, @RequestParam("title") String title,
			@RequestParam("content") String content, @RequestParam("id") String id,
			@RequestParam("documentState") String documentState, @RequestParam("documentNo") int documentNo,
			@RequestParam(value = "vacationDate", required = false) String vacationDate,
			@RequestParam(value = "startDate", required = false) Date startDate,
			@RequestParam(value = "endDate", required = false) Date endDate) throws ServletException, IOException {

		DocumentDTO dto = service.getDocument(documentNo);
		File directory = new File("C:/Users/KOSMO/Desktop/파일저장");
		if (!directory.exists()) {
			directory.mkdirs(); // 폴더가 존재하지 않는 경우, 폴더를 생성합니다.
		}

		// 파일 처리 로직
		if (fileData != null && !fileData.isEmpty()) {
			try {
				String fileName = fileData.getOriginalFilename();
				File file = new File(directory + "/" + fileName);
				fileData.transferTo(file);
				System.out.println("File saved: " + file.getAbsolutePath());

				// 저장된 파일의 경로를 dto 객체에 설정
				dto.setFilePath(file.getAbsolutePath());
			} catch (IOException e) {
				System.err.println("File save error: " + e.getMessage());
			}
		}

		dto.setDocumentType(documentType);
		dto.setAuthor(author);
		dto.setRetentionPeriod(retentionPeriod);
		dto.setSecurityLevel(securityLevel);
		dto.setTitle(title);
		dto.setContent(content);
		dto.setId(id);
		System.out.println("startdate " + startDate);
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		dto.setStartDate(formatter.format(startDate));
		dto.setEndDate(formatter.format(endDate));
		dto.setVacationDate(vacationDate);
		if (dto.getVacationDate() != null) {
			// 휴가차감
			System.out.println("휴가를가? 차감한다 ");
			service.vacationDeduction(dto);
			System.out.println("차감완료");
		}

		service.updateVacationDocument(dto);
		System.out.println("수정후ㅠto" + dto);

		System.out.println("수정성공");
	}

	// 서류상세 -> 결재자 목록
	@GetMapping("/approverInfo")
	public List<UserDTO> getApproverInfo(@RequestParam("approverNos") List<Long> approverNo,
			@RequestParam("documentNo") int documentNo) throws ServletException, IOException {
		System.out.println("controller - getApproverInfo");
		System.out.println("approverNo" + approverNo);
		List<UserDTO> approversInfo = service.findApproverByNo(approverNo, documentNo);
		return approversInfo;
	}

	// 결재승인
	@PostMapping("/approve/{id}/{documentNo}")
	public void approve(@PathVariable String id, @PathVariable int documentNo) throws ServletException, IOException {
		System.out.println(id);
		System.out.println(documentNo);

		int no = service.getEmployeeNo(id);

		DocumentDTO dto = service.getDocument(documentNo);

		int approverOrder = service.getApproverOrder(dto, no);

		int approverCount = service.getApproverCount(dto);

		System.out.println("결재자수" + approverCount + "명");
		System.out.println("결재차례" + approverOrder + "번");
		System.out.println(dto);
		if (approverOrder == 1) {
			System.out.println("한명이니까 이거 탄다");
			dto.setFirstApproverState("결재완료");
			if (approverCount > 1) {
				dto.setSecondApproverState("결재중");
			} else {
				dto.setDocumentState("결재완료");
			}
		} else if (approverOrder == 2) {
			System.out.println("두명이니까 이거 탄다");
			dto.setSecondApproverState("결재완료");
			if (approverCount > 2) {
				dto.setThirdApproverState("결재중");
			} else {
				dto.setDocumentState("결재완료");
			}
		} else if (approverOrder == 3) {
			System.out.println("세명이니까 이거 탄다");
			dto.setThirdApproverState("결재완료");
			if (approverCount > 3) {
				dto.setFourthApproverState("결재중");
			} else {
				dto.setDocumentState("결재완료");
			}
		} else if (approverOrder == 4) {
			System.out.println("네명이니까 이거 탄다");
			dto.setFourthApproverState("결재완료");
			dto.setDocumentState("결재완료");
		}
		System.out.println("아무것도 안탄다 ㅅㄱ");
		System.out.println(dto);

		service.documentApprove(dto);
		System.out.println("승인완료");

	}

	// 반려
	@PostMapping("/addRejectionReason/{rejectionReason}/{id}/{documentNo}/{vacationDate}")
	public void addRejectionReason(@PathVariable String id, @PathVariable String rejectionReason,
			@PathVariable(value = "vacationDate", required = false) String vacationDate, @PathVariable int documentNo)
			throws ServletException, IOException {

		int no = service.getEmployeeNo(id);
		DocumentDTO dto = service.getDocument(documentNo);
		int approverOrder = service.getApproverOrder(dto, no);

		System.out.println(approverOrder);
		System.out.println(dto);
		dto.setRejectionReason(rejectionReason);
		if (approverOrder == 1) {
			dto.setFirstApproverState("반려");
			dto.setDocumentState("반려됨");
		} else if (approverOrder == 2) {
			dto.setSecondApproverState("반려");
			dto.setDocumentState("반려됨");
		} else if (approverOrder == 3) {
			dto.setThirdApproverState("반려");
			dto.setDocumentState("반려됨");
		} else if (approverOrder == 4) {
			dto.setFourthApproverState("반려");
			dto.setDocumentState("반려됨");
		}

		service.documentRejection(dto);
		System.out.println(dto);
		System.out.println("반려완료");

		if (dto.getVacationDate() != null) {
			System.out.println("vacationDate" + vacationDate);
			dto.setVacationDate(vacationDate);
			System.out.println("휴가는 돌려줘야지");
			service.addVacationDate(dto);
			System.out.println("돌려줬다");

		}

	}

	// 휴가일수
	@GetMapping("/getAnnualCount/{id}")
	public UserDTO getAnnualCount(@PathVariable String id) throws ServletException, IOException {
		System.out.println("컨트롤러 - getAnnualCount");
		System.out.println("id" + id);
		UserDTO dto = service.getUserData(id);
		System.out.println(dto);

		return dto;
	}
	@GetMapping("/downloadFile/{fileName}")
	   public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
	       // 파일을 로드합니다.
	       File targetFile = new File("C:/Users/KOSMO/Desktop/파일저장" + "/" + fileName);

	       try {
	           // 파일을 리소스로 변환합니다.
	           Path filePath = targetFile.toPath();
	           Resource resource = new UrlResource(filePath.toUri());

	           if (resource.exists()) {
	               // 파일의 콘텐츠 타입을 결정합니다.
	               String contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());

	               if (contentType == null) {
	                   contentType = "application/octet-stream";
	               }

	               // 파일을 ResponseEntity에 담아 반환합니다.
	               return ResponseEntity.ok()
	                       .contentType(MediaType.parseMediaType(contentType))
	                       .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
	                       .body(resource);
	           } else {
	               throw new FileNotFoundException("File not found " + fileName);
	           }
	       } catch (Exception e) {
	           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	       }
	   }

}
