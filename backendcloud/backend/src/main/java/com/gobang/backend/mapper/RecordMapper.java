package com.gobang.backend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.gobang.backend.pojo.Record;
import org.apache.ibatis.annotations.Mapper;

/**
 * @author xzt
 * @version 1.0
 */
@Mapper
public interface RecordMapper extends BaseMapper<Record> {
}
