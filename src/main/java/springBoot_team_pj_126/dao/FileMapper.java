package springBoot_team_pj_126.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

import springBoot_team_pj_126.dto.File;

@Mapper
public interface FileMapper {
    @Insert("INSERT INTO files (id, name, path, upload_time) VALUES (#{id}, #{name}, #{path}, #{uploadTime})")
    void insert(File file);
}