package org.kub.web.tutorial.claim.model;

import java.util.List;

import org.kub.web.util.paging.Range;

public class ModelList {

    public List<Object> getList() {
		return list;
	}

	public void setList(List<Object> list) {
		this.list = list;
	}

	public Range getRange() {
		return range;
	}

	public void setRange(Range range) {
		this.range = range;
	}

	private List<Object> list;

    private Range range;


}