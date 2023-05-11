//package springBoot_team_pj_126.controller;
//
//import java.io.File;
//import java.io.IOException;
//import java.nio.file.Files;
//import java.util.List;
//
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.nimbusds.jose.shaded.json.JSONObject;
//
//import springBoot_team_pj_126.dto.DocumentDTO;
//import springBoot_team_pj_126.dto.UserDTO;
//import springBoot_team_pj_126.service.DocumentService;
//
//
//@RequestMapping(value="/members")
//@RestController
//public class NotificationController {
//
//	@Autowired(required=true)
//	private DocumentService service;
//	
//	//결재서류 목록
//	@GetMapping("/document/{id}")
//	public List<DocumentDTO> DocumentList(@PathVariable String id, HttpServletRequest req, Model model) 
//			throws ServletException, IOException{
//		System.out.println("컨트롤러 - DocumentList");
//		System.out.println("id"+id);
//		List<DocumentDTO> list = service.documentList(id,req, model);
//		System.out.println("list : " + list);
//		
//		return list;
//	}
//	
////	// 결재서류 상세페이지
////	@GetMapping("/documentDetail/{documentNo}")
////	public DocumentDTO documentDetail(@PathVariable int documentNo)
////			throws ServletException, IOException{
////		System.out.println("controller - documentDetail");
////		System.out.println("documentNO" + documentNo);
////		DocumentDTO dto = service.documentDetail(documentNo);
////		System.out.println("dto"+ dto);
////		return dto;
////	}
////	
////	//결재자 목록
////	@GetMapping("/approver")
////	public List<UserDTO> ApproverList(HttpServletRequest req, Model model) 
////			throws ServletException, IOException{
////		System.out.println("컨트롤러 - ApproverList");
////		List<UserDTO> list = service.approverList(req, model);
////		System.out.println("list : " + list);
////		return service.approverList(req, model);
////	}
////	
//	// 알림 항목 등록  
//	@PostMapping("/sendNotification")
//	public void NotificationDTO (@RequestBody Notification notification) 
//			throws ServletException, IOException {
//
//		File directory = new File("C:/Users/KOSMO/Desktop/파일저장");
//	    if (!directory.exists()) {
//	        directory.mkdirs(); // 폴더가 존재하지 않는 경우, 폴더를 생성합니다.
//	    }
//
//	    // 파일 처리 로직
//	    if (fileData != null && !fileData.isEmpty()) {
//	        try {
//	            String fileName = fileData.getOriginalFilename();
//	            File file = new File(directory + "/" + fileName);
//	            fileData.transferTo(file);
//	            System.out.println("File saved: " + file.getAbsolutePath());
//
//	            // 저장된 파일의 경로를 dto 객체에 설정
//	            dto.setFilePath(file.getAbsolutePath());
//	        } catch (IOException e) {
//	            System.err.println("File save error: " + e.getMessage());
//	        }
//	    }
//	    
////	    Integer[] approverNos = {storedApprover0, storedApprover1, storedApprover2, storedApprover3};
////
////	    for (int i = 0; i < approverNos.length; i++) {
////	        if (approverNos[i] != null) {
////	            switch (i) {
////	                case 0:
////	                    dto.setFirstApproverNo(approverNos[i]);
////	                    break;
////	                case 1:
////	                    dto.setSecondApproverNo(approverNos[i]);
////	                    break;
////	                case 2:
////	                    dto.setThirdApproverNo(approverNos[i]);
////	                    break;
////	                case 3:
////	                    dto.setFourthApproverNo(approverNos[i]);
////	                    break;
////	            }
////	        }
////	    }
////	    dto.setDocumentType(documentType);
////	    dto.setAuthor(author);
////	    dto.setRetentionPeriod(retentionPeriod);
////	    dto.setSecurityLevel(securityLevel);
////	    dto.setTitle(title);
////	    dto.setContent(content);
////	    dto.setId(id);
////
////	    System.out.println("storedApprover0: " + storedApprover0);
////	    System.out.println(dto);
////	    service.addDocument(dto);
////	    System.out.println("등록성공");
////	}
////	
////	// 결재서류 수정 
////		@PostMapping("/updateDocument")
////		public void updateDocument(@RequestParam("fileData") MultipartFile fileData, 
////								@RequestParam(value = "approverNo0", required = false) Integer storedApprover0,
////								@RequestParam(value = "approverNo1", required = false) Integer storedApprover1,
////								@RequestParam(value = "approverNo2", required = false) Integer storedApprover2,
////								@RequestParam(value = "approverNo3", required = false) Integer storedApprover3,
////								@RequestParam("documentType") String documentType,
////								@RequestParam("author") String author,
////								@RequestParam("retentionPeriod") String retentionPeriod,
////								@RequestParam("securityLevel") String securityLevel,
////								@RequestParam("title") String title,
////								@RequestParam("content") String content,
////								@RequestParam("id") String id,
////								DocumentDTO dto) throws ServletException, IOException {
////
////			File directory = new File("C:/Users/KOSMO/Desktop/파일저장");
////		    if (!directory.exists()) {
////		        directory.mkdirs(); // 폴더가 존재하지 않는 경우, 폴더를 생성합니다.
////		    }
////
////		    // 파일 처리 로직
////		    if (fileData != null && !fileData.isEmpty()) {
////		        try {
////		            String fileName = fileData.getOriginalFilename();
////		            File file = new File(directory + "/" + fileName);
////		            fileData.transferTo(file);
////		            System.out.println("File saved: " + file.getAbsolutePath());
////
////		            // 저장된 파일의 경로를 dto 객체에 설정
////		            dto.setFilePath(file.getAbsolutePath());
////		        } catch (IOException e) {
////		            System.err.println("File save error: " + e.getMessage());
////		        }
////		    }
////		    
////		    Integer[] approverNos = {storedApprover0, storedApprover1, storedApprover2, storedApprover3};
////
////		    for (int i = 0; i < approverNos.length; i++) {
////		        if (approverNos[i] != null) {
////		            switch (i) {
////		                case 0:
////		                    dto.setFirstApproverNo(approverNos[i]);
////		                    break;
////		                case 1:
////		                    dto.setSecondApproverNo(approverNos[i]);
////		                    break;
////		                case 2:
////		                    dto.setThirdApproverNo(approverNos[i]);
////		                    break;
////		                case 3:
////		                    dto.setFourthApproverNo(approverNos[i]);
////		                    break;
////		            }
////		        }
////		    }
////		    dto.setDocumentType(documentType);
////		    dto.setAuthor(author);
////		    dto.setRetentionPeriod(retentionPeriod);
////		    dto.setSecurityLevel(securityLevel);
////		    dto.setTitle(title);
////		    dto.setContent(content);
////		    dto.setId(id);
////
////		    System.out.println("storedApprover0: " + storedApprover0);
////		    System.out.println(dto);
////		    service.updateDocument(dto);
////		    System.out.println("수정성공");
////		}
////	
////	 @GetMapping("/approverInfo")
////	    public List<UserDTO> getApproverInfo(@RequestParam("approverNos") List<Long> approverNo)
////	            throws ServletException, IOException {
////	        System.out.println("controller - getApproverInfo");
////	        System.out.println("approverNo" + approverNo);
////	        List<UserDTO> approversInfo = service.findApproverByNo(approverNo);
////	        return approversInfo;
////	    }
//	 
//}
