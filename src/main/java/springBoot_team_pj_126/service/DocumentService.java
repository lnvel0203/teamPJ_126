package springBoot_team_pj_126.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import springBoot_team_pj_126.dto.DocumentDTO;
import springBoot_team_pj_126.dto.UserDTO;


public interface DocumentService {

      
   // 결재자 목록(대리급 이상)
   public List<UserDTO> approverList(HttpServletRequest req, Model model) 
         throws ServletException, IOException;
   
   // 서류 작성 
   public void addDocument(DocumentDTO dto) throws ServletException, IOException;
   
   // 서류 상세 
   public DocumentDTO documentDetail(int documentNo)
         throws ServletException, IOException;
   
   // 서류상세 -> 결재자 정보 
   public List<UserDTO> findApproverByNo(List<Long> approverNo, int documentNo)
         throws ServletException, IOException;
   
   // 서류수정 
   public void updateDocument(DocumentDTO dto) throws ServletException, IOException;
   
   // 결재 대기 목록 
   public List<DocumentDTO> getApprovalPendingList(String id) 
         throws ServletException, IOException;
   
   // 결재 예정 목록 
   public List<DocumentDTO> getApprovalScheduledList(String id) 
         throws ServletException, IOException;
   
   // 결재 완료 목록 
   public List<DocumentDTO> getApprovalCompletedList(String id) 
         throws ServletException, IOException;
   
   // 기안 문서 목록 
   public List<DocumentDTO> getDraftDocumentList(String id) 
         throws ServletException, IOException;
   
   // 반려 목록 
   public List<DocumentDTO> getRejectionDocumentList(String id) 
         throws ServletException, IOException;

   // 사원의 id값 get 
   public int getEmployeeNo(String id)
         throws ServletException, IOException;

   // 서류 정보 
   public DocumentDTO getDocument(int documentNo)
         throws ServletException, IOException;
   
   // 결재자의 결재 순서 
   public int getApproverOrder(DocumentDTO dto, int no)
         throws ServletException, IOException;
   
   // 문서의 결재자 수 
   public int getApproverCount(DocumentDTO dto)
         throws ServletException, IOException;
   
   // 결재 승인 
   public void documentApprove(DocumentDTO dto)
         throws ServletException, IOException;
   
   // 반려 
   public void documentRejection(DocumentDTO dto)
         throws ServletException, IOException;
   
   public UserDTO getUserData(String id)
         throws ServletException, IOException;
   

   
   
}